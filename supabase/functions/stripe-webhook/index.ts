// Endpoint público chamado pelo Stripe (sem JWT de usuário — autenticado via Stripe-Signature).
// Princípio inegociável (18 - Pagamentos/Integração Stripe do vault): só este webhook libera
// acesso; a página de retorno de sucesso do Checkout NUNCA é prova de pagamento.
//
// Idempotência: grava stripe_event_id em stripe_webhook_events com constraint unique antes de
// processar; se já existir (23505), responde 200 sem reprocessar. Nenhum payload bruto do
// Stripe é persistido (evita dado pessoal em log/banco) — só identificadores.

import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  const signature = req.headers.get("Stripe-Signature");
  const rawBody = await req.text();

  if (!signature) {
    return new Response("Assinatura ausente", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Validação da assinatura ANTES de qualquer parsing/uso do corpo — usa o corpo bruto.
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("Falha na validação da assinatura do webhook", err);
    return new Response("Assinatura inválida", { status: 400 });
  }

  const { error: insertError } = await admin
    .from("stripe_webhook_events")
    .insert({ stripe_event_id: event.id, tipo: event.type });

  if (insertError) {
    if (insertError.code === "23505") {
      // Evento já processado — responde 200 rápido sem reprocessar.
      return new Response(JSON.stringify({ received: true, duplicado: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Erro ao registrar evento do webhook", insertError);
    return new Response("Erro interno", { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "payment" && session.metadata?.pedido_id) {
          const paymentIntentId = typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

          await admin
            .from("pedidos")
            .update({
              status: "pago",
              pago_em: new Date().toISOString(),
              stripe_payment_intent_id: paymentIntentId,
            })
            .eq("id", session.metadata.pedido_id);
        } else if (
          session.mode === "subscription" && session.metadata?.assinatura_id
        ) {
          const subscriptionId = typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id ?? null;

          await admin
            .from("assinaturas")
            .update({ stripe_subscription_id: subscriptionId })
            .eq("id", session.metadata.assinatura_id);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await admin
          .from("assinaturas")
          .update({
            status: subscription.status,
            periodo_atual_fim: new Date(
              subscription.current_period_end * 1000,
            ).toISOString(),
            cancelar_ao_fim_periodo: subscription.cancel_at_period_end,
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await admin
          .from("assinaturas")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "invoice.payment_failed": {
        // Só registrado via stripe_webhook_events acima (idempotência/auditoria).
        // customer.subscription.updated é a fonte de verdade que move status -> past_due.
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Erro ao processar evento do webhook", event.type, err);
    return new Response("Erro ao processar evento", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

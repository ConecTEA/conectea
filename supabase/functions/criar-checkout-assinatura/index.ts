// Cria uma Stripe Checkout Session (modo assinatura) para o responsável autenticado.
// stripe_customer_id de responsaveis só é lido/gravado via service_role (client não tem
// permissão de UPDATE nessa coluna — ver migration responsaveis_trava_stripe_customer_id_fix),
// para evitar que um usuário malicioso associe a própria conta ao Customer de outra pessoa.

import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const SITE_URL = Deno.env.get("SITE_URL") ?? "http://localhost:5173";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Método não permitido" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse({ error: "Não autenticado" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return jsonResponse({ error: "Não autenticado" }, 401);
  }
  const responsavelId = userData.user.id;
  const responsavelEmail = userData.user.email ?? "";

  let body: { plano_id?: string; crianca_id?: string | null };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Corpo inválido" }, 400);
  }

  if (!body.plano_id) {
    return jsonResponse({ error: "plano_id é obrigatório" }, 400);
  }

  const { data: plano, error: planoError } = await supabase
    .from("planos_assinatura")
    .select("id, stripe_price_id, ativo")
    .eq("id", body.plano_id)
    .single();

  if (planoError || !plano || !plano.ativo) {
    return jsonResponse({ error: "Plano não encontrado" }, 404);
  }

  if (!plano.stripe_price_id) {
    return jsonResponse(
      { error: "Plano ainda sem price_id do Stripe configurado" },
      409,
    );
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: responsavel, error: respError } = await admin
    .from("responsaveis")
    .select("id, email, stripe_customer_id")
    .eq("id", responsavelId)
    .single();

  if (respError || !responsavel) {
    return jsonResponse({ error: "Responsável não encontrado" }, 404);
  }

  let stripeCustomerId = responsavel.stripe_customer_id as string | null;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: responsavel.email || responsavelEmail,
      metadata: { responsavel_id: responsavelId },
    });
    stripeCustomerId = customer.id;

    const { error: setCustomerError } = await admin
      .from("responsaveis")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("id", responsavelId);

    if (setCustomerError) {
      console.error("Falha ao gravar stripe_customer_id", setCustomerError);
      return jsonResponse({ error: "Falha ao preparar cliente Stripe" }, 500);
    }
  }

  const { data: assinatura, error: assinaturaError } = await supabase
    .from("assinaturas")
    .insert({
      responsavel_id: responsavelId,
      plano_id: plano.id,
      crianca_id: body.crianca_id ?? null,
    })
    .select("id")
    .single();

  if (assinaturaError || !assinatura) {
    console.error("Falha ao iniciar assinatura", assinaturaError);
    return jsonResponse({ error: "Falha ao iniciar assinatura" }, 500);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: plano.stripe_price_id, quantity: 1 }],
    success_url: `${SITE_URL}/assinatura/minha`,
    cancel_url: `${SITE_URL}/assinatura/planos`,
    metadata: {
      responsavel_id: responsavelId,
      plano_id: plano.id,
      assinatura_id: assinatura.id,
    },
  });

  return jsonResponse({ url: session.url });
});

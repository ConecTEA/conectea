// Cria uma Stripe Checkout Session (modo pagamento único) para o pedido em rascunho do
// responsável autenticado. Nunca confia em preço vindo do client — monta os line_items a
// partir de itens_pedido, que já tem o preço travado na inserção (ver migration itens_pedido).
// Só o webhook do Stripe (stripe-webhook) confirma o pagamento; esta função apenas inicia o
// checkout e marca o pedido como aguardando_pagamento.

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

  let body: { pedido_id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Corpo inválido" }, 400);
  }

  if (!body.pedido_id) {
    return jsonResponse({ error: "pedido_id é obrigatório" }, 400);
  }

  // RLS já garante que só retorna o pedido se pertencer ao usuário autenticado.
  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .select("id, status, responsavel_id")
    .eq("id", body.pedido_id)
    .eq("responsavel_id", responsavelId)
    .single();

  if (pedidoError || !pedido) {
    return jsonResponse({ error: "Pedido não encontrado" }, 404);
  }

  if (pedido.status !== "rascunho") {
    return jsonResponse({ error: "Pedido não está em rascunho" }, 409);
  }

  const { data: itens, error: itensError } = await supabase
    .from("itens_pedido")
    .select("nome_box_snapshot, preco_unitario_centavos, quantidade")
    .eq("pedido_id", pedido.id);

  if (itensError || !itens || itens.length === 0) {
    return jsonResponse({ error: "Pedido sem itens" }, 409);
  }

  const lineItems = itens.map((item) => ({
    price_data: {
      currency: "brl",
      product_data: { name: item.nome_box_snapshot },
      unit_amount: item.preco_unitario_centavos,
    },
    quantity: item.quantidade,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${SITE_URL}/checkout/confirmacao?pedido_id=${pedido.id}`,
    cancel_url: `${SITE_URL}/carrinho`,
    client_reference_id: responsavelId,
    metadata: { pedido_id: pedido.id },
  });

  const { error: updateError } = await supabase
    .from("pedidos")
    .update({
      status: "aguardando_pagamento",
      stripe_checkout_session_id: session.id,
    })
    .eq("id", pedido.id);

  if (updateError) {
    console.error("Falha ao registrar sessão de checkout", updateError);
    return jsonResponse({ error: "Falha ao registrar sessão de checkout" }, 500);
  }

  return jsonResponse({ url: session.url });
});

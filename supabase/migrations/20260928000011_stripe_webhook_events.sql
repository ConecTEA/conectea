-- stripe_webhook_events: garante idempotência do processamento do webhook do Stripe.
-- Nenhum payload bruto do Stripe é guardado (evita dado pessoal em log/banco) — só IDs.
create table public.stripe_webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  tipo text not null,
  relacionado_pedido_id uuid references public.pedidos(id),
  relacionado_assinatura_id uuid references public.assinaturas(id),
  processado_em timestamptz not null default now()
);

alter table public.stripe_webhook_events enable row level security;

-- Decisão explícita, documentada: NENHUMA policy para anon/authenticated (nem select, nem
-- insert, nem update, nem delete). RLS habilitada = nega tudo por padrão. Só o service_role
-- (que ignora RLS) lê e escreve aqui — usado exclusivamente pela Edge Function stripe-webhook.

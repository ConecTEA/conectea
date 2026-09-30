-- pedidos: o carrinho É um pedido em status 'rascunho' (F-49). Também cobre confirmação (F-25)
-- e acompanhamento (F-29). O cliente nunca consegue setar status além de
-- rascunho/aguardando_pagamento: só o webhook do Stripe (service_role, ignora RLS) avança
-- para pago/cancelado/expirado — "só o webhook libera acesso" (18 - Pagamentos/Integração Stripe).
create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  endereco_entrega_id uuid references public.enderecos_entrega(id) on delete set null,
  status text not null default 'rascunho'
    check (status in ('rascunho','aguardando_pagamento','pago','cancelado','expirado')),
  valor_total_centavos integer not null default 0 check (valor_total_centavos >= 0),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  pago_em timestamptz
);

create index pedidos_responsavel_id_status_idx on public.pedidos(responsavel_id, status);

alter table public.pedidos enable row level security;

create policy "responsavel le os proprios pedidos" on public.pedidos
  for select using (auth.uid() = responsavel_id);

create policy "responsavel cria pedido em rascunho" on public.pedidos
  for insert with check (auth.uid() = responsavel_id and status = 'rascunho');

create policy "responsavel edita o proprio pedido ate o checkout" on public.pedidos
  for update
  using (auth.uid() = responsavel_id and status in ('rascunho','aguardando_pagamento'))
  with check (auth.uid() = responsavel_id and status in ('rascunho','aguardando_pagamento'));

create policy "responsavel apaga pedido em rascunho" on public.pedidos
  for delete using (auth.uid() = responsavel_id and status = 'rascunho');

create trigger pedidos_set_atualizado_em
  before update on public.pedidos
  for each row execute function public.set_atualizado_em();

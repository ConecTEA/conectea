-- planos_assinatura: catálogo de planos de assinatura (F-26). Vocabulário de intervalo igual
-- ao Stripe (recurring.interval) para mapear 1:1 na hora de criar o Price no Stripe.
create table public.planos_assinatura (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text not null,
  preco_centavos integer not null check (preco_centavos > 0),
  intervalo text not null check (intervalo in ('day','week','month','year')),
  intervalo_count integer not null default 1 check (intervalo_count > 0),
  beneficios text[] not null default '{}',
  stripe_price_id text,
  ativo boolean not null default true
);

alter table public.planos_assinatura enable row level security;

create policy "planos publicos" on public.planos_assinatura
  for select to anon, authenticated using (ativo);

-- Mesma decisão de boxes: sem insert/update/delete via client.

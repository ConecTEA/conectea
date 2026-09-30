-- assinaturas: vínculo responsável↔plano↔Stripe (F-30). Vocabulário de status igual ao
-- Stripe Subscription. A transição de 'incomplete' para qualquer outro status é feita
-- exclusivamente pelo webhook (service_role) — sem policy de update/delete para o client.
create table public.assinaturas (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  plano_id uuid not null references public.planos_assinatura(id),
  crianca_id uuid references public.criancas(id) on delete set null,
  status text not null default 'incomplete'
    check (status in ('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid','paused')),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  periodo_atual_fim timestamptz,
  cancelar_ao_fim_periodo boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index assinaturas_responsavel_id_idx on public.assinaturas(responsavel_id);

alter table public.assinaturas enable row level security;

create policy "responsavel le a propria assinatura" on public.assinaturas
  for select using (auth.uid() = responsavel_id);

create policy "responsavel inicia uma assinatura" on public.assinaturas
  for insert with check (auth.uid() = responsavel_id and status = 'incomplete');

create trigger assinaturas_set_atualizado_em
  before update on public.assinaturas
  for each row execute function public.set_atualizado_em();

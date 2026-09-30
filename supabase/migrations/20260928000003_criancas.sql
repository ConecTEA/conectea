-- criancas: filhos do responsável (F-06, F-08, F-10). Não têm login próprio.
-- Classificação ADR-001: nome/idade/interesses = 🟡 operacional; diagnostico = 🔴 sensível.
create table public.criancas (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  nome text not null,
  idade smallint not null check (idade between 0 and 17),
  diagnostico text,
  interesses text[] not null default '{}',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index criancas_responsavel_id_idx on public.criancas(responsavel_id);

alter table public.criancas enable row level security;

create policy "responsavel le as proprias criancas" on public.criancas
  for select using (auth.uid() = responsavel_id);

create policy "responsavel cadastra crianca" on public.criancas
  for insert with check (auth.uid() = responsavel_id);

create policy "responsavel edita a propria crianca" on public.criancas
  for update using (auth.uid() = responsavel_id) with check (auth.uid() = responsavel_id);

create policy "responsavel exclui a propria crianca" on public.criancas
  for delete using (auth.uid() = responsavel_id);

create trigger criancas_set_atualizado_em
  before update on public.criancas
  for each row execute function public.set_atualizado_em();

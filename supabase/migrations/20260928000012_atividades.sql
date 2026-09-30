-- atividades: registro de atividades com a criança (F-12, F-15).
-- Risco aceito e documentado: 'descricao' é texto livre; nada no schema impede que o
-- responsável escreva ali uma observação clínica (o que elevaria o dado para 🔴 na prática).
create table public.atividades (
  id uuid primary key default gen_random_uuid(),
  crianca_id uuid not null references public.criancas(id) on delete cascade,
  titulo text not null,
  descricao text,
  realizada_em timestamptz not null default now(),
  criado_em timestamptz not null default now()
);

create index atividades_crianca_id_idx on public.atividades(crianca_id);

alter table public.atividades enable row level security;

create policy "responsavel gerencia atividades das proprias criancas" on public.atividades
  for all
  using (exists (select 1 from public.criancas c where c.id = crianca_id and c.responsavel_id = auth.uid()))
  with check (exists (select 1 from public.criancas c where c.id = crianca_id and c.responsavel_id = auth.uid()));

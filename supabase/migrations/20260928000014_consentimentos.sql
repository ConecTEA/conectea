-- consentimentos: tabela reservada (ADR-001). Não é escrita por nenhuma das 19 funcionalidades
-- do MVP ainda — existe para não exigir uma migration destrutiva quando o consentimento formal
-- (LGPD art. 14 §1º) virar obrigatório, com dado real de criança.
create table public.consentimentos (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  crianca_id uuid references public.criancas(id) on delete cascade,
  tipo text not null,
  versao_termo text not null,
  aceito_em timestamptz not null default now(),
  revogado_em timestamptz
);

create index consentimentos_responsavel_id_idx on public.consentimentos(responsavel_id);

alter table public.consentimentos enable row level security;

create policy "responsavel le os proprios consentimentos" on public.consentimentos
  for select using (auth.uid() = responsavel_id);

create policy "responsavel registra consentimento" on public.consentimentos
  for insert with check (auth.uid() = responsavel_id);

-- Sem update/delete: consentimento é um registro de auditoria, não se edita. Revogação
-- futura deveria ser uma nova linha ou coluna dedicada, a desenhar quando o fluxo for ativado.

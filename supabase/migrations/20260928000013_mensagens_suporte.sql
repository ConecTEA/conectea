-- mensagens_suporte: contato/suporte (F-50). Sem update/delete: mensagem enviada é imutável
-- nesta fase (não há painel administrativo — F-48 fora de escopo).
create table public.mensagens_suporte (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  email_contato text not null,
  assunto text not null,
  mensagem text not null,
  criado_em timestamptz not null default now()
);

create index mensagens_suporte_responsavel_id_idx on public.mensagens_suporte(responsavel_id);

alter table public.mensagens_suporte enable row level security;

create policy "responsavel le as proprias mensagens" on public.mensagens_suporte
  for select using (auth.uid() = responsavel_id);

create policy "responsavel envia mensagem" on public.mensagens_suporte
  for insert with check (auth.uid() = responsavel_id);

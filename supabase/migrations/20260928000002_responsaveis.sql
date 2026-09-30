-- responsaveis: estende auth.users. Ator único autenticado do sistema (ADR-001, corrigido 23/09/2026).
create table public.responsaveis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  telefone text,
  stripe_customer_id text unique,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.responsaveis enable row level security;

create policy "responsavel le o proprio perfil" on public.responsaveis
  for select using (auth.uid() = id);

create policy "responsavel atualiza o proprio perfil" on public.responsaveis
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Sem policy de insert: só o trigger handle_new_user (security definer) escreve aqui.
-- Sem policy de delete: exclusão de conta está fora de escopo nesta fase (F-04 fora do MVP).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.responsaveis (id, nome, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', ''), new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Função reaproveitada por todas as tabelas com coluna atualizado_em.
create or replace function public.set_atualizado_em()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger responsaveis_set_atualizado_em
  before update on public.responsaveis
  for each row execute function public.set_atualizado_em();

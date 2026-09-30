-- enderecos_entrega: endereços de entrega do responsável (F-28).
create table public.enderecos_entrega (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references public.responsaveis(id) on delete cascade,
  rotulo text,
  cep text not null,
  logradouro text not null,
  numero text not null,
  complemento text,
  bairro text not null,
  cidade text not null,
  uf char(2) not null,
  padrao boolean not null default false,
  criado_em timestamptz not null default now()
);

create index enderecos_entrega_responsavel_id_idx on public.enderecos_entrega(responsavel_id);

alter table public.enderecos_entrega enable row level security;

create policy "responsavel gerencia os proprios enderecos" on public.enderecos_entrega
  for all using (auth.uid() = responsavel_id) with check (auth.uid() = responsavel_id);

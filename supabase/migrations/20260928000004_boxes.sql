-- boxes: catálogo de boxes sensoriais (F-19). Vitrine pública, escrita só via seed/migration.
create table public.boxes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text not null,
  preco_centavos integer not null check (preco_centavos > 0),
  cor text,
  stripe_price_id text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.boxes enable row level security;

create policy "vitrine de boxes publica" on public.boxes
  for select to anon, authenticated using (ativo);

-- Sem insert/update/delete via client: decisão explícita. Catálogo é escrito só por
-- seed/migration (service_role); não há CRUD de catálogo nesta fase (F-48 fora de escopo).

create trigger boxes_set_atualizado_em
  before update on public.boxes
  for each row execute function public.set_atualizado_em();

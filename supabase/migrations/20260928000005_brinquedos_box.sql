-- brinquedos_box: itens que compõem cada box e o que estimulam (F-22).
create table public.brinquedos_box (
  id uuid primary key default gen_random_uuid(),
  box_id uuid not null references public.boxes(id) on delete cascade,
  nome text not null,
  estimulo text not null,
  ordem smallint not null default 0
);

create index brinquedos_box_box_id_idx on public.brinquedos_box(box_id);

alter table public.brinquedos_box enable row level security;

create policy "brinquedos da vitrine publicos" on public.brinquedos_box
  for select to anon, authenticated
  using (exists (select 1 from public.boxes b where b.id = box_id and b.ativo));

-- Mesma decisão de boxes: sem insert/update/delete via client.

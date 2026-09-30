-- itens_pedido: itens do carrinho/pedido. preco_unitario_centavos e nome_box_snapshot são
-- capturados no momento da inserção (snapshot) para preservar o histórico caso o catálogo mude
-- depois. A policy de insert trava manipulação de preço: só aceita o preço atual do catálogo.
create table public.itens_pedido (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos(id) on delete cascade,
  box_id uuid not null references public.boxes(id),
  quantidade integer not null default 1 check (quantidade > 0),
  preco_unitario_centavos integer not null check (preco_unitario_centavos >= 0),
  nome_box_snapshot text not null
);

create index itens_pedido_pedido_id_idx on public.itens_pedido(pedido_id);

alter table public.itens_pedido enable row level security;

create policy "responsavel le itens do proprio pedido" on public.itens_pedido
  for select using (exists (
    select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = auth.uid()
  ));

create policy "responsavel adiciona item ao proprio carrinho" on public.itens_pedido
  for insert with check (
    exists (select 1 from public.pedidos p
            where p.id = pedido_id and p.responsavel_id = auth.uid() and p.status = 'rascunho')
    and preco_unitario_centavos = (select preco_centavos from public.boxes where id = box_id)
  );

create policy "responsavel ajusta quantidade no proprio carrinho" on public.itens_pedido
  for update
  using (exists (select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = auth.uid() and p.status = 'rascunho'))
  with check (exists (select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = auth.uid() and p.status = 'rascunho'));

create policy "responsavel remove item do proprio carrinho" on public.itens_pedido
  for delete using (exists (
    select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = auth.uid() and p.status = 'rascunho'
  ));

-- security definer: precisa escrever em pedidos independente da policy de update de pedidos,
-- porque essa função é quem MANTÉM valor_total_centavos coerente com os itens.
create or replace function public.recalcular_total_pedido()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  alvo_pedido uuid;
begin
  alvo_pedido := coalesce(new.pedido_id, old.pedido_id);

  update public.pedidos
  set valor_total_centavos = coalesce((
    select sum(quantidade * preco_unitario_centavos)
    from public.itens_pedido
    where pedido_id = alvo_pedido
  ), 0)
  where id = alvo_pedido;

  return null;
end;
$$;

create trigger itens_pedido_recalcula_total
  after insert or update or delete on public.itens_pedido
  for each row execute function public.recalcular_total_pedido();

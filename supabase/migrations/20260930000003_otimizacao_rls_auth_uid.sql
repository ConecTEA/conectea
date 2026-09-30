-- Performance: as policies chamavam auth.uid() diretamente, o que o Postgres reavalia para
-- CADA linha varrida. Envolver em (select auth.uid()) permite ao planner tratar como InitPlan
-- (avaliado uma única vez por consulta). Mesmo efeito de segurança, mais rápido em escala.
-- https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

alter policy "responsavel le o proprio perfil" on public.responsaveis
  using ((select auth.uid()) = id);

alter policy "responsavel atualiza o proprio perfil" on public.responsaveis
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

alter policy "responsavel le as proprias criancas" on public.criancas
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel cadastra crianca" on public.criancas
  with check ((select auth.uid()) = responsavel_id);

alter policy "responsavel edita a propria crianca" on public.criancas
  using ((select auth.uid()) = responsavel_id) with check ((select auth.uid()) = responsavel_id);

alter policy "responsavel exclui a propria crianca" on public.criancas
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel gerencia os proprios enderecos" on public.enderecos_entrega
  using ((select auth.uid()) = responsavel_id) with check ((select auth.uid()) = responsavel_id);

alter policy "responsavel le os proprios pedidos" on public.pedidos
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel cria pedido em rascunho" on public.pedidos
  with check ((select auth.uid()) = responsavel_id and status = 'rascunho');

alter policy "responsavel edita o proprio pedido ate o checkout" on public.pedidos
  using ((select auth.uid()) = responsavel_id and status in ('rascunho','aguardando_pagamento'))
  with check ((select auth.uid()) = responsavel_id and status in ('rascunho','aguardando_pagamento'));

alter policy "responsavel apaga pedido em rascunho" on public.pedidos
  using ((select auth.uid()) = responsavel_id and status = 'rascunho');

alter policy "responsavel le itens do proprio pedido" on public.itens_pedido
  using (exists (
    select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = (select auth.uid())
  ));

alter policy "responsavel adiciona item ao proprio carrinho" on public.itens_pedido
  with check (
    exists (select 1 from public.pedidos p
            where p.id = pedido_id and p.responsavel_id = (select auth.uid()) and p.status = 'rascunho')
    and preco_unitario_centavos = (select preco_centavos from public.boxes where id = box_id)
  );

alter policy "responsavel ajusta quantidade no proprio carrinho" on public.itens_pedido
  using (exists (select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = (select auth.uid()) and p.status = 'rascunho'))
  with check (exists (select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = (select auth.uid()) and p.status = 'rascunho'));

alter policy "responsavel remove item do proprio carrinho" on public.itens_pedido
  using (exists (
    select 1 from public.pedidos p where p.id = pedido_id and p.responsavel_id = (select auth.uid())
  ));

alter policy "responsavel le a propria assinatura" on public.assinaturas
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel inicia uma assinatura" on public.assinaturas
  with check ((select auth.uid()) = responsavel_id and status = 'incomplete');

alter policy "responsavel gerencia atividades das proprias criancas" on public.atividades
  using (exists (select 1 from public.criancas c where c.id = crianca_id and c.responsavel_id = (select auth.uid())))
  with check (exists (select 1 from public.criancas c where c.id = crianca_id and c.responsavel_id = (select auth.uid())));

alter policy "responsavel le as proprias mensagens" on public.mensagens_suporte
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel envia mensagem" on public.mensagens_suporte
  with check ((select auth.uid()) = responsavel_id);

alter policy "responsavel le os proprios consentimentos" on public.consentimentos
  using ((select auth.uid()) = responsavel_id);

alter policy "responsavel registra consentimento" on public.consentimentos
  with check ((select auth.uid()) = responsavel_id);

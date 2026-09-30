-- Pivô de produto (30/09/2026, ADR-008): pagamento deixa de integrar com o Stripe e passa a
-- ser inteiramente SIMULADO -- nenhuma transação real, nenhuma conta Stripe necessária. Remove
-- as colunas/tabela que só faziam sentido com um gateway real e libera o próprio responsável a
-- marcar o pedido/assinatura como pago/ativa (sem risco de fraude: não há dinheiro envolvido).

-- stripe_webhook_events perde a razão de existir: não há webhook de gateway nenhum.
drop table public.stripe_webhook_events;

-- Colunas específicas de integração com o Stripe, agora sem uso.
alter table public.boxes drop column stripe_price_id;
alter table public.planos_assinatura drop column stripe_price_id;
alter table public.responsaveis drop column stripe_customer_id;
alter table public.pedidos drop column stripe_checkout_session_id;
alter table public.pedidos drop column stripe_payment_intent_id;
alter table public.assinaturas drop column stripe_customer_id;
alter table public.assinaturas drop column stripe_subscription_id;

-- pedidos: simplifica o vocabulário de status (não existe mais "aguardando_pagamento" de um
-- gateway externo) e libera o próprio responsável a simular a confirmação/cancelamento.
alter table public.pedidos drop constraint pedidos_status_check;
alter table public.pedidos add constraint pedidos_status_check
  check (status in ('rascunho','pago','cancelado'));

drop policy "responsavel edita o proprio pedido ate o checkout" on public.pedidos;
create policy "responsavel gerencia o proprio pedido" on public.pedidos
  for update
  using ((select auth.uid()) = responsavel_id)
  with check ((select auth.uid()) = responsavel_id);

-- Preenche pago_em automaticamente quando o responsável simula a confirmação do pagamento,
-- em vez de depender do client mandar o timestamp certo.
create or replace function public.set_pago_em()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'pago' and old.status is distinct from 'pago' then
    new.pago_em = now();
  end if;
  return new;
end;
$$;

create trigger pedidos_set_pago_em
  before update on public.pedidos
  for each row execute function public.set_pago_em();

-- assinaturas: simplifica o vocabulário de status (não existe mais ciclo de vida de assinatura
-- Stripe) e libera o próprio responsável a simular ativação/cancelamento diretamente.
alter table public.assinaturas drop constraint assinaturas_status_check;
alter table public.assinaturas add constraint assinaturas_status_check
  check (status in ('ativa','cancelada'));
alter table public.assinaturas alter column status set default 'ativa';

drop policy "responsavel inicia uma assinatura" on public.assinaturas;
create policy "responsavel cria a propria assinatura" on public.assinaturas
  for insert
  with check ((select auth.uid()) = responsavel_id);

create policy "responsavel gerencia a propria assinatura" on public.assinaturas
  for update
  using ((select auth.uid()) = responsavel_id)
  with check ((select auth.uid()) = responsavel_id);

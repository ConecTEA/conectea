-- Índices em chaves estrangeiras que o advisor de performance apontou como faltantes.
create index if not exists assinaturas_crianca_id_idx on public.assinaturas(crianca_id);
create index if not exists assinaturas_plano_id_idx on public.assinaturas(plano_id);
create index if not exists consentimentos_crianca_id_idx on public.consentimentos(crianca_id);
create index if not exists itens_pedido_box_id_idx on public.itens_pedido(box_id);
create index if not exists pedidos_endereco_entrega_id_idx on public.pedidos(endereco_entrega_id);
create index if not exists stripe_webhook_events_relacionado_assinatura_id_idx on public.stripe_webhook_events(relacionado_assinatura_id);
create index if not exists stripe_webhook_events_relacionado_pedido_id_idx on public.stripe_webhook_events(relacionado_pedido_id);

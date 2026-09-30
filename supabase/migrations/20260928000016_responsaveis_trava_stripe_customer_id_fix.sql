-- A migration anterior (revoke update de uma coluna só) não bloqueou nada: o Supabase concede
-- UPDATE na tabela inteira por padrão para authenticated/anon (default privileges), e um grant
-- de tabela inteira cobre implicitamente todas as colunas mesmo depois de revogar uma coluna
-- específica. Testado e confirmado via execute_sql (update com stripe_customer_id malicioso
-- funcionava mesmo após a migration anterior). Correção real: revogar o UPDATE geral e
-- conceder de volta só nas colunas que o próprio responsável pode editar (nome, telefone).
revoke update on public.responsaveis from authenticated;
grant update (nome, telefone) on public.responsaveis to authenticated;

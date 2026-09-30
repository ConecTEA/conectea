-- A migration anterior (revoke execute ... from public) não bastou: o Supabase concede EXECUTE
-- diretamente a anon/authenticated em toda função nova do schema public (default privileges),
-- do mesmo jeito que faz com GRANT em tabelas. Confirmado via has_function_privilege() que o
-- advisor de segurança continuava acusando handle_new_user/recalcular_total_pedido como
-- chamáveis via /rest/v1/rpc/... mesmo depois do revoke anterior. Corrigido revogando
-- explicitamente de anon e authenticated. Os triggers continuam funcionando normalmente
-- (trigger não depende de EXECUTE do papel que disparou a operação).
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.recalcular_total_pedido() from anon, authenticated;

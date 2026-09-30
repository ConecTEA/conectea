-- Correções apontadas pelo advisor de segurança do Supabase:
-- 1) set_atualizado_em não tinha search_path fixo (function_search_path_mutable).
-- 2) handle_new_user e recalcular_total_pedido são SECURITY DEFINER e só deveriam rodar via
--    trigger, mas o Postgres concede EXECUTE a PUBLIC por padrão em toda função nova — isso as
--    deixava chamáveis diretamente por qualquer usuário via /rest/v1/rpc/<funcao>. Revogado.

create or replace function public.set_atualizado_em()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.recalcular_total_pedido() from public;

-- Defesa em profundidade: a policy de update de responsaveis (auth.uid() = id) permite ao
-- próprio usuário reescrever qualquer coluna da própria linha, inclusive stripe_customer_id.
-- Isso abriria uma fraude possível: o usuário grava ali o stripe_customer_id de outra pessoa
-- e a Edge Function de assinatura passaria a reusar o Customer de terceiros no Stripe.
-- stripe_customer_id só pode ser escrito pelo service_role (dentro da Edge Function).
revoke update (stripe_customer_id) on public.responsaveis from authenticated;

-- Garante a extensão usada para gen_random_uuid() (Supabase já costuma trazer habilitada;
-- deixamos explícito e idempotente por segurança).
create extension if not exists pgcrypto;

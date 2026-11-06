import { createClient } from '@supabase/supabase-js'

/*
  Cliente do Supabase. A URL e a chave anon são públicas por desenho (quem protege os dados é a RLS),
  mas vêm do ambiente: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
  Sem elas o site continua abrindo (vitrine), só o login fica indisponível.
*/
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = url && chave ? createClient(url, chave) : null

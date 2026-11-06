import { supabase } from './supabase'

export const msgSemServidor = 'Não foi possível conectar ao servidor. Tente novamente em instantes.'

type AuthErro = { code?: string; message?: string } | null

function traduzir(erro: AuthErro): string {
  switch (erro?.code) {
    case 'invalid_credentials':
      return 'E-mail ou senha incorretos.'
    case 'email_not_confirmed':
      return 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
    case 'user_already_exists':
    case 'email_exists':
      return 'Este e-mail já está cadastrado. Tente entrar.'
    case 'weak_password':
      return 'Escolha uma senha mais forte.'
    case 'same_password':
      return 'A nova senha precisa ser diferente da atual.'
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return 'Muitas tentativas seguidas. Aguarde um pouco e tente de novo.'
    default:
      return msgSemServidor
  }
}

/** Retorna null quando deu certo, ou a mensagem de erro. */
export async function entrarComSenha(email: string, senha: string): Promise<string | null> {
  if (!supabase) return msgSemServidor
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })
  return error ? traduzir(error) : null
}

export type ResultadoCadastro = { erro?: string; precisaConfirmar?: boolean }

export async function criarConta(nome: string, email: string, senha: string): Promise<ResultadoCadastro> {
  if (!supabase) return { erro: msgSemServidor }
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: senha,
    options: { data: { nome: nome.trim() }, emailRedirectTo: window.location.origin },
  })
  if (error) return { erro: traduzir(error) }
  // E-mail já cadastrado com confirmação ligada: o Supabase não dá erro, devolve identities vazio.
  if (data.user && data.user.identities?.length === 0) return { erro: traduzir({ code: 'user_already_exists' }) }
  return { precisaConfirmar: !data.session }
}

export async function pedirRecuperacao(email: string): Promise<string | null> {
  if (!supabase) return msgSemServidor
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })
  return error ? traduzir(error) : null
}

export async function definirNovaSenha(senha: string): Promise<string | null> {
  if (!supabase) return msgSemServidor
  const { error } = await supabase.auth.updateUser({ password: senha })
  return error ? traduzir(error) : null
}

export async function sairDaConta(): Promise<void> {
  await supabase?.auth.signOut()
}

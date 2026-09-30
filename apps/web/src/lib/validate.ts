// Mensagens padrão do sistema. Reutilize sempre as mesmas.
export const msg = {
  obrigatorio: 'Preencha este campo.',
  email: 'Informe um e-mail válido.',
  senhaCurta: 'A senha precisa ter pelo menos 8 caracteres.',
  senhasDiferentes: 'As senhas não são iguais.',
  numero: 'Informe apenas números.',
  cep: 'Informe um CEP com 8 números.',
  salvo: 'Alterações salvas.',
}

export const vazio = (v: string) => v.trim() === ''
export const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
export const soNumeros = (v: string) => /^\d+$/.test(v.trim())

export type Erros = Record<string, string>
export const temErro = (e: Erros) => Object.keys(e).length > 0

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Btn } from '../components/Btn'
import { SenhaField } from '../components/Field'
import { Alert, Card, Titulo } from '../components/ui'
import { definirNovaSenha } from '../lib/auth'
import { msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'

// Destino do link do e-mail de recuperação: o Supabase abre uma sessão temporária e aqui se troca a senha.
export default function RedefinirSenha() {
  const { usuario, carregandoSessao } = useStore()
  const [senha, setSenha] = useState('')
  const [conf, setConf] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [geral, setGeral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [pronto, setPronto] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(senha)) n.senha = msg.obrigatorio
    else if (senha.length < 8) n.senha = msg.senhaCurta
    if (vazio(conf)) n.conf = msg.obrigatorio
    else if (conf !== senha) n.conf = msg.senhasDiferentes
    setErros(n)
    setGeral('')
    if (temErro(n)) return

    setEnviando(true)
    const falha = await definirNovaSenha(senha)
    setEnviando(false)
    if (falha) return setGeral(falha)
    setPronto(true)
  }

  const on = (set: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => set(e.target.value)

  return (
    <>
      <Titulo apoio="Escolha uma senha nova para a sua conta.">Nova senha</Titulo>
      <div className="mx-auto max-w-[480px]">
        <Card>
          {carregandoSessao ? (
            <p className="text-center">Verificando o link...</p>
          ) : pronto ? (
            <div className="space-y-4">
              <Alert variant="sucesso">Senha alterada. Você já está logado.</Alert>
              <Btn to="/inicio" block>
                Ir para o início
              </Btn>
            </div>
          ) : !usuario ? (
            <div className="space-y-4">
              <Alert variant="alerta">Este link é inválido ou já expirou. Peça um novo.</Alert>
              <Btn to="/recuperar-senha" block>
                Pedir novo link
              </Btn>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-4">
              {geral ? <Alert variant="alerta">{geral}</Alert> : null}
              <SenhaField
                label="Nova senha"
                id="senha"
                autoComplete="new-password"
                required
                value={senha}
                onChange={on(setSenha)}
                error={erros.senha}
              />
              <SenhaField
                label="Confirmar nova senha"
                id="conf"
                autoComplete="new-password"
                required
                value={conf}
                onChange={on(setConf)}
                error={erros.conf}
              />
              <Btn type="submit" block disabled={enviando}>
                {enviando ? 'Salvando...' : 'Salvar nova senha'}
              </Btn>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}

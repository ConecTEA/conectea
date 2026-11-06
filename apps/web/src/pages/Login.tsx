import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field, SenhaField } from '../components/Field'
import { Alert, Card, Titulo } from '../components/ui'
import { entrarComSenha } from '../lib/auth'
import { emailValido, msg, temErro, vazio, type Erros } from '../lib/validate'

export default function Login() {
  const nav = useNavigate()
  const loc = useLocation()
  const estado = loc.state as { aviso?: string; de?: string; motivo?: string } | null
  const aviso = estado?.aviso
  const destino = estado?.de ?? '/inicio'
  const motivo = estado?.motivo

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [geral, setGeral] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    const novos: Erros = {}
    if (vazio(email)) novos.email = msg.obrigatorio
    else if (!emailValido(email)) novos.email = msg.email
    if (vazio(senha)) novos.senha = msg.obrigatorio
    setErros(novos)
    setGeral('')
    if (temErro(novos)) return

    setEnviando(true)
    const erro = await entrarComSenha(email, senha)
    setEnviando(false)
    if (erro) {
      setGeral(erro)
      return
    }
    nav(destino, { replace: true })
  }

  return (
    <>
    <Titulo>Entrar</Titulo>
    <div className="mx-auto max-w-[500px]">
      <Card>
        <h2 className="text-3xl">Entrar na conta</h2>
        {motivo === 'compra' ? (
          <div className="mt-4">
            <Alert variant="info">Para finalizar a compra, entre ou crie sua conta. Seu carrinho foi guardado.</Alert>
          </div>
        ) : null}
        {aviso ? (
          <div className="mt-4">
            <Alert variant="sucesso">{aviso}</Alert>
          </div>
        ) : null}
        {geral ? (
          <div className="mt-4">
            <Alert variant="alerta">{geral}</Alert>
          </div>
        ) : null}
        <form onSubmit={enviar} noValidate className="mt-5 space-y-4">
          <Field
            label="E-mail"
            id="email"
            type="email"
            autoComplete="username"
            inputMode="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={erros.email}
          />
          <SenhaField
            label="Senha"
            id="senha"
            autoComplete="current-password"
            required
            value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            error={erros.senha}
          />
          <Btn type="submit" block disabled={enviando}>
            {enviando ? 'Entrando...' : 'Entrar'}
          </Btn>
        </form>
        <div className="mt-4 flex flex-col items-center">
          <Link to="/recuperar-senha" className="inline-flex min-h-12 items-center font-extrabold text-violet underline">
            Esqueci minha senha
          </Link>
          <Link to="/cadastro" state={estado} className="inline-flex min-h-12 items-center font-extrabold text-violet underline">
            Ainda não tenho conta
          </Link>
        </div>
      </Card>
    </div>
    </>
  )
}

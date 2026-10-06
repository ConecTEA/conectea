import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field, SenhaField } from '../components/Field'
import { Alert, Card } from '../components/ui'
import { emailValido, msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'

export default function Login() {
  const { entrar } = useStore()
  const nav = useNavigate()
  const loc = useLocation()
  const aviso = (loc.state as { aviso?: string; de?: string } | null)?.aviso
  const destino = (loc.state as { de?: string } | null)?.de ?? '/inicio'

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [geral, setGeral] = useState('')
  const [enviando, setEnviando] = useState(false)

  function enviar(e: FormEvent) {
    e.preventDefault()
    const novos: Erros = {}
    if (vazio(email)) novos.email = msg.obrigatorio
    else if (!emailValido(email)) novos.email = msg.email
    if (vazio(senha)) novos.senha = msg.obrigatorio
    setErros(novos)
    setGeral('')
    if (temErro(novos)) return

    setEnviando(true)
    setTimeout(() => {
      // Simulação: a senha "errada" mostra o erro geral. Qualquer outra entra.
      if (senha === 'errada') {
        setGeral('E-mail ou senha incorretos.')
        setEnviando(false)
        return
      }
      entrar(email)
      nav(destino, { replace: true })
    }, 400)
  }

  return (
    <div className="mx-auto max-w-[480px]">
      <Card>
        <h1 className="text-2xl">Entrar</h1>
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
          <Link to="/recuperar-senha" className="inline-flex min-h-12 items-center text-primary-dark underline">
            Esqueci minha senha
          </Link>
          <Link to="/cadastro" className="inline-flex min-h-12 items-center text-primary-dark underline">
            Ainda não tenho conta
          </Link>
        </div>
      </Card>
    </div>
  )
}

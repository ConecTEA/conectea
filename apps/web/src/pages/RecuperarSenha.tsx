import { useState, type FormEvent } from 'react'
import { Btn } from '../components/Btn'
import { Field } from '../components/Field'
import { Alert, Card, Titulo } from '../components/ui'
import { pedirRecuperacao } from '../lib/auth'
import { emailValido, msg, vazio } from '../lib/validate'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    if (vazio(email)) return setErro(msg.obrigatorio)
    if (!emailValido(email)) return setErro(msg.email)
    setErro('')
    setEnviando(true)
    const falha = await pedirRecuperacao(email)
    setEnviando(false)
    if (falha) return setErro(falha)
    // Mesma resposta exista o e-mail ou não, para não revelar quem tem conta.
    setEnviado(true)
  }

  return (
    <>
    <Titulo apoio="Informe o e-mail da sua conta.">Recuperar senha</Titulo>
    <div className="mx-auto max-w-[480px]">
      <Card>
        {enviado ? (
          <div className="mt-5 space-y-4">
            <Alert variant="sucesso">Se o e-mail estiver cadastrado, você receberá as instruções.</Alert>
            <Btn to="/login" block>
              Voltar para o login
            </Btn>
          </div>
        ) : (
          <>
            <form onSubmit={enviar} noValidate className="space-y-4">
              <Field
                label="E-mail"
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                error={erro}
              />
              <Btn type="submit" block disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar link de recuperação'}
              </Btn>
            </form>
            <p className="mt-4 text-center">
              <Btn to="/login" variant="ghost">
                Voltar para o login
              </Btn>
            </p>
          </>
        )}
      </Card>
    </div>
    </>
  )
}

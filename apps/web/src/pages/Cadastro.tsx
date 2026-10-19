import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field, SenhaField } from '../components/Field'
import { Card } from '../components/ui'
import { IconCheck } from '../components/Icons'
import { emailValido, msg, temErro, vazio, type Erros } from '../lib/validate'

export default function Cadastro() {
  const nav = useNavigate()
  const loc = useLocation()
  const estado = loc.state as { de?: string; motivo?: string } | null
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [conf, setConf] = useState('')
  const [aceite, setAceite] = useState(false)
  const [erros, setErros] = useState<Erros>({})

  const senhaOk = senha.length >= 8

  function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(nome)) n.nome = msg.obrigatorio
    if (vazio(email)) n.email = msg.obrigatorio
    else if (!emailValido(email)) n.email = msg.email
    else if (email.trim().toLowerCase() === 'marina@exemplo.com') n.email = 'Este e-mail já está cadastrado. Tente entrar.'
    if (vazio(senha)) n.senha = msg.obrigatorio
    else if (!senhaOk) n.senha = msg.senhaCurta
    if (vazio(conf)) n.conf = msg.obrigatorio
    else if (conf !== senha) n.conf = msg.senhasDiferentes
    if (!aceite) n.aceite = 'É necessário aceitar para continuar.'
    setErros(n)
    if (temErro(n)) return
    nav('/login', { state: { ...estado, aviso: 'Sua conta foi criada. Agora entre.' } })
  }

  const on = (set: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => set(e.target.value)

  return (
    <div className="mx-auto max-w-[480px]">
      <Card>
        <h1 className="text-2xl">Criar conta</h1>
        <form onSubmit={enviar} noValidate className="mt-5 space-y-4">
          <Field label="Nome do responsável" id="nome" autoComplete="name" required value={nome} onChange={on(setNome)} error={erros.nome} />
          <Field
            label="E-mail"
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={on(setEmail)}
            error={erros.email}
          />
          <div>
            <SenhaField
              label="Senha"
              id="senha"
              autoComplete="new-password"
              required
              value={senha}
              onChange={on(setSenha)}
              error={erros.senha}
            />
            <p className={`mt-1 flex items-center gap-1 text-sm ${senhaOk ? 'text-text' : 'text-muted'}`}>
              {senhaOk ? <IconCheck width={16} height={16} className="text-success" /> : <span aria-hidden="true">•</span>}
              Mínimo de 8 caracteres{senhaOk ? ' (cumprido)' : ''}
            </p>
          </div>
          <SenhaField
            label="Confirmar senha"
            id="conf"
            autoComplete="new-password"
            required
            value={conf}
            onChange={on(setConf)}
            error={erros.conf}
          />

          <div>
            <label className="flex min-h-12 items-start gap-3">
              <input
                type="checkbox"
                checked={aceite}
                onChange={(e) => setAceite(e.target.checked)}
                aria-invalid={erros.aceite ? true : undefined}
                className="mt-1 h-6 w-6 shrink-0 accent-primary-dark"
              />
              <span>
                Li e aceito os{' '}
                <Link to="#" className="text-primary-dark underline">
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link to="#" className="text-primary-dark underline">
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>
            {erros.aceite ? (
              <p aria-live="polite" className="mt-1 text-sm font-medium text-alert-dark">
                {erros.aceite}
              </p>
            ) : null}
          </div>

          <Btn type="submit" block>
            Criar conta
          </Btn>
        </form>
        <p className="mt-4 text-center">
          <Link to="/login" state={estado} className="inline-flex min-h-12 items-center text-primary-dark underline">
            Já tenho conta
          </Link>
        </p>
      </Card>
    </div>
  )
}

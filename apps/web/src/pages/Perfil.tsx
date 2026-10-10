import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Btn } from '../components/Btn'
import { Field, SenhaField } from '../components/Field'
import { Alert, Card, Titulo } from '../components/ui'
import { emailValido, msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'

export default function Perfil() {
  const { usuario, atualizarUsuario } = useStore()
  const [nome, setNome] = useState(usuario?.nome ?? '')
  const [email, setEmail] = useState(usuario?.email ?? '')
  const [erros, setErros] = useState<Erros>({})
  const [salvo, setSalvo] = useState(false)

  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [conf, setConf] = useState('')
  const [errosSenha, setErrosSenha] = useState<Erros>({})
  const [senhaOk, setSenhaOk] = useState(false)

  function salvar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(nome)) n.nome = msg.obrigatorio
    if (vazio(email)) n.email = msg.obrigatorio
    else if (!emailValido(email)) n.email = msg.email
    setErros(n)
    setSalvo(false)
    if (temErro(n)) return
    atualizarUsuario({ nome: nome.trim(), email: email.trim() })
    setSalvo(true)
  }

  function trocarSenha(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(atual)) n.atual = msg.obrigatorio
    if (vazio(nova)) n.nova = msg.obrigatorio
    else if (nova.length < 8) n.nova = msg.senhaCurta
    if (vazio(conf)) n.conf = msg.obrigatorio
    else if (conf !== nova) n.conf = msg.senhasDiferentes
    setErrosSenha(n)
    setSenhaOk(false)
    if (temErro(n)) return
    setAtual('')
    setNova('')
    setConf('')
    setSenhaOk(true)
  }

  const on = (set: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => set(e.target.value)

  return (
    <div className="mx-auto max-w-[640px]">
      <Titulo apoio="Edite seus dados. As crianças ficam em “Minhas crianças”.">Meu perfil</Titulo>

      <Card>
        <div className="mb-5 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-violet font-display text-2xl font-bold text-white">
            {(nome.trim().charAt(0) || '?').toUpperCase()}
          </span>
          <div>
            <p className="font-display text-xl font-bold">{usuario?.nome}</p>
            <p className="text-ink-soft">{usuario?.email}</p>
          </div>
        </div>

        {salvo ? (
          <div className="mb-4">
            <Alert variant="sucesso">{msg.salvo}</Alert>
          </div>
        ) : null}

        <form onSubmit={salvar} noValidate className="space-y-4">
          <Field label="Nome" id="nome" autoComplete="name" required value={nome} onChange={on(setNome)} error={erros.nome} />
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
          <Btn type="submit">Salvar alterações</Btn>
        </form>
      </Card>

      <Card className="mt-6">
        <h2 className="text-xl">Alterar senha</h2>
        {senhaOk ? (
          <div className="mt-4">
            <Alert variant="sucesso">Senha alterada.</Alert>
          </div>
        ) : null}
        <form onSubmit={trocarSenha} noValidate className="mt-4 space-y-4">
          <SenhaField label="Senha atual" id="atual" autoComplete="current-password" required value={atual} onChange={on(setAtual)} error={errosSenha.atual} />
          <SenhaField label="Nova senha" id="nova" autoComplete="new-password" required value={nova} onChange={on(setNova)} error={errosSenha.nova} help="Mínimo de 8 caracteres." />
          <SenhaField label="Confirmar nova senha" id="conf" autoComplete="new-password" required value={conf} onChange={on(setConf)} error={errosSenha.conf} />
          <Btn type="submit" variant="secondary">
            Alterar senha
          </Btn>
        </form>
        <p className="mt-3 text-sm text-ink-soft">Nesta demonstração, a senha não é guardada.</p>
      </Card>
    </div>
  )
}

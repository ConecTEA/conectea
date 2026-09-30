import { useState } from 'react'
import { useLocation } from 'react-router'
import { Btn } from '../components/Btn'
import { FormCrianca } from '../components/FormCrianca'
import { Alert, Card, EmptyState } from '../components/ui'
import { msg } from '../lib/validate'
import { useStore } from '../store'

export default function PerfilCrianca() {
  const { crianca, salvarCrianca } = useStore()
  const loc = useLocation()
  const [editando, setEditando] = useState(false)
  const [salvo, setSalvo] = useState(Boolean((loc.state as { salvo?: boolean } | null)?.salvo))

  if (!crianca) {
    return (
      <div className="mx-auto max-w-[640px]">
        <h1 className="mb-6 text-2xl md:text-3xl">Minha criança</h1>
        <EmptyState
          titulo="Nenhuma criança cadastrada."
          texto="Cadastre para receber sugestões de boxes."
          acao="Cadastrar criança"
          to="/crianca/cadastro"
        />
      </div>
    )
  }

  const dados: [string, string][] = [
    ['Nome', crianca.nome],
    ['Idade', `${crianca.idade} anos`],
    ['Diagnóstico', crianca.diagnostico || 'Não informado'],
    ['Gostos e interesses', crianca.gostos || 'Não informado'],
  ]

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl">Minha criança</h1>
        {!editando ? (
          <Btn
            variant="secondary"
            onClick={() => {
              setSalvo(false)
              setEditando(true)
            }}
          >
            Editar dados
          </Btn>
        ) : null}
      </div>

      {salvo && !editando ? (
        <div className="mb-4">
          <Alert variant="sucesso">{msg.salvo}</Alert>
        </div>
      ) : null}

      <Card>
        {editando ? (
          <FormCrianca
            inicial={crianca}
            rotuloSalvar="Salvar alterações"
            onSalvar={(c) => {
              salvarCrianca(c)
              setEditando(false)
              setSalvo(true)
            }}
            onCancelar={() => setEditando(false)}
          />
        ) : (
          <dl className="space-y-4">
            {dados.map(([r, v]) => (
              <div key={r}>
                <dt className="text-sm text-muted">{r}</dt>
                <dd className="text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Card>
    </div>
  )
}

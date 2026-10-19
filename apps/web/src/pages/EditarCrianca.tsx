import { useNavigate, useParams } from 'react-router'
import { FormCrianca } from '../components/FormCrianca'
import { Card, EmptyState } from '../components/ui'
import { useStore } from '../store'

export default function EditarCrianca() {
  const { id } = useParams()
  const { criancas, salvarCrianca } = useStore()
  const nav = useNavigate()
  const crianca = criancas.find((c) => c.id === id)

  if (!crianca) {
    return (
      <div className="mx-auto max-w-[480px]">
        <h1 className="mb-6 text-3xl">Criança não encontrada</h1>
        <EmptyState titulo="Criança não encontrada." acao="Ver minhas crianças" to="/criancas" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[480px]">
      <h1 className="mb-6 text-3xl md:text-4xl">Editar {crianca.nome}</h1>
      <Card>
        <FormCrianca
          inicial={crianca}
          rotuloSalvar="Salvar alterações"
          onSalvar={(c) => {
            salvarCrianca({ ...c, id: crianca.id })
            nav('/criancas')
          }}
          onCancelar={() => nav('/criancas')}
        />
      </Card>
    </div>
  )
}

import { useNavigate, useParams } from 'react-router'
import { FormCrianca } from '../components/FormCrianca'
import { Card, EmptyState, Titulo } from '../components/ui'
import { useStore } from '../store'

export default function EditarCrianca() {
  const { id } = useParams()
  const { criancas, salvarCrianca } = useStore()
  const nav = useNavigate()
  const crianca = criancas.find((c) => c.id === id)

  if (!crianca) {
    return (
      <>
        <Titulo olho="nada por aqui">Criança não encontrada</Titulo>
        <EmptyState titulo="Criança não encontrada." acao="Ver minhas crianças" to="/criancas" />
      </>
    )
  }

  return (
    <>
      <Titulo cor="sun" olho="ajuste o que mudou">
        Editar {crianca.nome}
      </Titulo>
      <div className="mx-auto max-w-[580px]">
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
    </>
  )
}

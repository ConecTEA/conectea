import { useNavigate } from 'react-router'
import { FormCrianca } from '../components/FormCrianca'
import { Alert, Card } from '../components/ui'
import { useStore } from '../store'

export default function CadastroCrianca() {
  const { salvarCrianca } = useStore()
  const nav = useNavigate()

  return (
    <div className="mx-auto max-w-[480px]">
      <h1 className="mb-4 text-2xl md:text-3xl">Cadastrar criança</h1>
      <Alert variant="info">Nesta versão de demonstração, use apenas dados fictícios.</Alert>
      <p className="my-4 text-muted">Registre apenas o que você se sentir confortável em informar.</p>
      <Card>
        <FormCrianca
          rotuloSalvar="Salvar"
          onSalvar={(c) => {
            salvarCrianca(c)
            nav('/crianca/perfil', { state: { salvo: true } })
          }}
          onCancelar={() => nav('/inicio')}
        />
      </Card>
    </div>
  )
}

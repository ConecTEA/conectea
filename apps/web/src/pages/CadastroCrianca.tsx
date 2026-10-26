import { useNavigate } from 'react-router'
import { FormCrianca } from '../components/FormCrianca'
import { Alert, Card, Titulo } from '../components/ui'
import { useStore } from '../store'

export default function CadastroCrianca() {
  const { salvarCrianca, criancas } = useStore()
  const nav = useNavigate()

  return (
    <>
      <Titulo>{criancas.length ? 'Adicionar outra criança' : 'Cadastrar criança'}</Titulo>
      <div className="mx-auto max-w-[580px]">
        <p className="mb-4 text-ink-soft">Registre apenas o que você se sentir confortável em informar.</p>
        <Alert variant="info">Nesta versão de demonstração, use apenas dados fictícios.</Alert>
        <div className="mt-6">
          <Card>
            <FormCrianca
              rotuloSalvar="Salvar"
              onSalvar={(c) => {
                salvarCrianca(c)
                nav('/criancas')
              }}
              onCancelar={() => nav('/criancas')}
            />
          </Card>
        </div>
      </div>
    </>
  )
}

import { Btn } from '../components/Btn'
import { Badge, Card, EmptyState, Titulo } from '../components/ui'
import { buscarPlano } from '../data/exemplos'
import { brl, dataBR } from '../lib/format'
import { useStore } from '../store'

export default function MinhaAssinatura() {
  const { assinatura } = useStore()
  const plano = buscarPlano(assinatura?.planoId)

  if (!assinatura || !plano) {
    return (
      <div className="mx-auto max-w-[640px]">
        <Titulo>Minha assinatura</Titulo>
        <EmptyState titulo="Você não tem assinatura ativa." acao="Ver planos" to="/assinatura/planos" />
      </div>
    )
  }

  const dados: [string, string][] = [
    ['Valor', `${brl(plano.preco)} ${plano.periodicidade}`],
    ['Início', dataBR(assinatura.inicio)],
    ['Próxima cobrança (exemplo)', dataBR(assinatura.proximaCobranca)],
    ['Forma de pagamento', assinatura.forma],
    ['Próxima box prevista', assinatura.proximaBox],
  ]

  return (
    <div className="mx-auto max-w-[640px]">
      <Titulo>Minha assinatura</Titulo>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl">Plano {plano.nome}</h2>
          <Badge tom="sucesso">Ativa</Badge>
        </div>
        <dl className="mt-4 space-y-3">
          {dados.map(([r, v]) => (
            <div key={r} className="flex flex-wrap justify-between gap-x-4">
              <dt className="text-muted">{r}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-border pt-4">
          <Btn to="/assinatura/planos" variant="secondary">
            Trocar de plano
          </Btn>
        </div>
      </Card>
    </div>
  )
}

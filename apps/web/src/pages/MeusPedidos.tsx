import { useState } from 'react'
import { Btn } from '../components/Btn'
import { IconChevron } from '../components/Icons'
import { Badge, Card, EmptyState, Titulo } from '../components/ui'
import type { StatusPedido } from '../data/exemplos'
import { brl, dataBR } from '../lib/format'
import { useStore } from '../store'

const tom = (s: StatusPedido) => (s === 'Entregue' ? 'sucesso' : s === 'Em preparação' ? 'atencao' : 'neutro')

export default function MeusPedidos() {
  const { pedidos } = useStore()
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-[760px]">
      <Titulo>Meus pedidos</Titulo>
      {pedidos.length === 0 ? (
        <EmptyState titulo="Você ainda não fez pedidos." acao="Ver catálogo" to="/loja" />
      ) : (
        <ul className="space-y-3">
          {pedidos.map((p) => {
            const aberta = aberto === p.numero
            return (
              <Card as="li" key={p.numero}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg">Pedido #{p.numero}</h2>
                    <p className="text-muted">{dataBR(p.data)}</p>
                  </div>
                  <Badge tom={tom(p.status)}>{p.status}</Badge>
                </div>
                <p className="mt-2">{p.itens.map((i) => i.nome).join(', ')}</p>
                <p className="mt-1 font-semibold">{brl(p.total)}</p>

                <button
                  type="button"
                  onClick={() => setAberto(aberta ? null : p.numero)}
                  aria-expanded={aberta}
                  aria-controls={`detalhe-${p.numero}`}
                  className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-card font-medium text-primary-dark underline"
                >
                  {aberta ? 'Ocultar detalhes' : 'Ver detalhes'}
                  <IconChevron className={aberta ? 'rotate-180' : ''} />
                </button>

                {aberta ? (
                  <dl id={`detalhe-${p.numero}`} className="mt-2 space-y-3 border-t border-border pt-3">
                    <div>
                      <dt className="text-sm text-muted">Itens</dt>
                      <dd>
                        <ul>
                          {p.itens.map((i) => (
                            <li key={i.nome} className="flex justify-between gap-3">
                              <span>
                                {i.nome}
                                {i.qtd > 1 ? ` × ${i.qtd}` : ''}
                              </span>
                              <span>{brl(i.preco * i.qtd)}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Endereço</dt>
                      <dd>{p.endereco}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Forma de pagamento</dt>
                      <dd>{p.forma}</dd>
                    </div>
                  </dl>
                ) : null}
              </Card>
            )
          })}
        </ul>
      )}
      <div className="mt-6">
        <Btn to="/loja" variant="ghost">
          Ver catálogo
        </Btn>
      </div>
    </div>
  )
}

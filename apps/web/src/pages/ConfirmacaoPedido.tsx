import { Btn } from '../components/Btn'
import { IconCheck } from '../components/Icons'
import { Card, EmptyState, Stepper, Titulo } from '../components/ui'
import { brl } from '../lib/format'
import { useStore } from '../store'
import { passosCompra } from './Endereco'

export default function ConfirmacaoPedido() {
  const { pedidos, ultimoPedido } = useStore()
  const pedido = pedidos.find((p) => p.numero === ultimoPedido)

  if (!pedido) {
    return <EmptyState titulo="Nenhum pedido recente." acao="Ver meus pedidos" to="/pedidos" />
  }

  return (
    <>
    <Titulo>
      Pedido <em>registrado.</em>
    </Titulo>
    <div className="mx-auto max-w-[640px]">
      <Stepper atual={3} passos={passosCompra} />
      <Card className="relative overflow-hidden text-center">
        {/* Peças que se encaixam ao abrir a tela (desligadas com "Reduzir animações") */}
        <div className="pointer-events-none relative mx-auto mb-2 h-28 w-40" aria-hidden="true">
          <svg viewBox="0 0 40 40" className="peca absolute left-0 top-2 h-14 w-14"><circle cx="20" cy="20" r="18" className="fill-violet" /></svg>
          <svg viewBox="0 0 40 40" className="peca absolute right-0 top-0 h-14 w-14"><rect x="3" y="3" width="34" height="34" rx="8" className="fill-coral" /></svg>
          <svg viewBox="0 0 40 40" className="peca absolute bottom-0 left-3 h-14 w-14"><path d="M2 36a18 18 0 0 1 36 0z" className="fill-sun" /></svg>
          <svg viewBox="0 0 40 40" className="peca absolute bottom-2 right-3 h-12 w-12"><circle cx="20" cy="20" r="14" className="fill-teal" /></svg>
        </div>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-white">
          <IconCheck width={28} height={28} />
        </span>
        <p className="mt-3 text-ink-soft">Este é um pedido de demonstração.</p>

        <dl className="mt-6 space-y-3 text-left">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Número do pedido</dt>
            <dd className="font-semibold">#{pedido.numero}</dd>
          </div>
          <div>
            <dt className="text-muted">Itens</dt>
            <dd>
              <ul>
                {pedido.itens.map((i) => (
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
          <div className="flex justify-between gap-3 border-t border-border pt-3 text-lg font-semibold">
            <dt>Total</dt>
            <dd>{brl(pedido.total)}</dd>
          </div>
          <div>
            <dt className="text-muted">Endereço</dt>
            <dd>{pedido.endereco}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Forma de pagamento</dt>
            <dd>{pedido.forma}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col items-center gap-2">
          <Btn to="/pedidos" block>
            Ver meus pedidos
          </Btn>
          <Btn to="/inicio" variant="ghost" block>
            Voltar ao início
          </Btn>
        </div>
      </Card>
    </div>
    </>
  )
}

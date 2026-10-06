import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Alert, Card, EmptyState, Titulo } from '../components/ui'
import { buscarBox } from '../data/boxes'
import { brl } from '../lib/format'
import { useStore } from '../store'

export default function Carrinho() {
  const { carrinho, alterarQtd, removerDoCarrinho, desfazerRemocao, removido, escolherPlano } = useStore()

  const linhas = carrinho.flatMap((i) => {
    const b = buscarBox(i.boxId)
    return b ? [{ ...i, box: b }] : []
  })
  const total = linhas.reduce((s, l) => s + l.box.preco * l.qtd, 0)

  const aviso = removido ? (
    <div className="mb-4">
      <Alert
        variant="info"
        action={
          <Btn variant="ghost" onClick={desfazerRemocao}>
            Desfazer
          </Btn>
        }
      >
        Item removido.
      </Alert>
    </div>
  ) : null

  if (linhas.length === 0) {
    return (
      <div>
        <Titulo>Carrinho</Titulo>
        {aviso}
        <EmptyState titulo="Seu carrinho está vazio." texto="Escolha uma box no catálogo." acao="Ver catálogo" to="/loja" />
      </div>
    )
  }

  return (
    <div>
      <Titulo>Carrinho</Titulo>
      {aviso}
      <div className="grid gap-6 md:grid-cols-3">
        <ul className="space-y-3 md:col-span-2">
          {linhas.map((l) => (
            <Card as="li" key={l.boxId}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg">{l.box.nome}</h2>
                  <p className="text-muted">{brl(l.box.preco)} cada</p>
                </div>
                <p className="text-lg font-semibold">{brl(l.box.preco * l.qtd)}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2" role="group" aria-label={`Quantidade de ${l.box.nome}`}>
                  <Btn variant="ghost" aria-label="Diminuir quantidade" onClick={() => alterarQtd(l.boxId, l.qtd - 1)} disabled={l.qtd <= 1} className="w-12 px-0">
                    −
                  </Btn>
                  <span className="min-w-8 text-center font-semibold" aria-live="polite">
                    {l.qtd}
                  </span>
                  <Btn variant="ghost" aria-label="Aumentar quantidade" onClick={() => alterarQtd(l.boxId, l.qtd + 1)} className="w-12 px-0">
                    +
                  </Btn>
                </div>
                <Btn variant="danger" onClick={() => removerDoCarrinho(l.boxId)}>
                  Remover
                </Btn>
              </div>
            </Card>
          ))}
        </ul>

        <aside>
          <Card className="md:sticky md:top-24">
            <h2 className="text-lg">Resumo do pedido</h2>
            <dl className="mt-4 space-y-2">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{brl(total)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-xl font-semibold">
                <dt>Total</dt>
                <dd>{brl(total)}</dd>
              </div>
            </dl>
            <div className="mt-5 space-y-3">
              <Btn to="/checkout/endereco" block onClick={() => escolherPlano(null)}>
                Continuar para o endereço
              </Btn>
              <p className="text-center">
                <Link to="/loja" className="inline-flex min-h-12 items-center text-primary-dark underline">
                  Continuar comprando
                </Link>
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

import { brl } from '../lib/format'
import { useStore } from '../store'
import { Card } from './ui'

export function ResumoPedido({ mostrarEndereco = false }: { mostrarEndereco?: boolean }) {
  const { itensCheckout, totalCheckout, endereco } = useStore()
  const itens = itensCheckout()

  return (
    <Card>
      <h2 className="text-lg">Resumo do pedido</h2>
      <ul className="mt-3 space-y-2">
        {itens.map((i) => (
          <li key={i.nome} className="flex justify-between gap-3">
            <span>
              {i.nome}
              {i.qtd > 1 ? ` × ${i.qtd}` : ''}
            </span>
            <span>{brl(i.preco * i.qtd)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between border-t border-border pt-3 text-lg font-semibold">
        <span>Total</span>
        <span>{brl(totalCheckout())}</span>
      </p>
      {mostrarEndereco && endereco ? (
        <div className="mt-4 border-t border-border pt-3 text-sm">
          <p className="font-medium">Entrega para</p>
          <p className="text-muted">
            {endereco.destinatario}
            <br />
            {endereco.rua}, {endereco.numero}
            {endereco.complemento ? `, ${endereco.complemento}` : ''}
            <br />
            {endereco.bairro}, {endereco.cidade} - {endereco.estado}
          </p>
        </div>
      ) : null}
    </Card>
  )
}

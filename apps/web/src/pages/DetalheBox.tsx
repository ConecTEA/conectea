import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Alert, Card, EmptyState } from '../components/ui'
import { buscarBox } from '../data/boxes'
import { brl } from '../lib/format'
import { useStore } from '../store'

export default function DetalheBox() {
  const { id } = useParams()
  const box = buscarBox(id)
  const { adicionarAoCarrinho } = useStore()
  const [adicionada, setAdicionada] = useState(false)

  if (!box) {
    return (
      <div>
        <h1 className="mb-6 text-2xl md:text-3xl">Box não encontrada</h1>
        <EmptyState titulo="Box não encontrada." acao="Ver catálogo" to="/loja" />
      </div>
    )
  }

  return (
    <div>
      <p className="mb-2">
        <Link to="/loja" className="inline-flex min-h-12 items-center text-primary-dark underline">
          Voltar ao catálogo
        </Link>
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <CapaBox box={box} className="mb-6 h-40 md:h-64" />
          <h1 className="text-3xl md:text-4xl">{box.nome}</h1>
          <p className="mt-3 text-lg">{box.descricao}</p>

          <h2 className="mt-8 text-xl">Brinquedos desta box</h2>
          <ul className="mt-3 space-y-3">
            {box.brinquedos.map((b) => (
              <Card as="li" key={b.nome}>
                <h3 className="text-base">{b.nome}</h3>
                <p className="mt-1">
                  <span className="font-medium">O que estimula: </span>
                  {b.estimulo}
                </p>
              </Card>
            ))}
          </ul>
          <div className="mt-6">
            <Alert variant="info">Conteúdo informativo. Não substitui orientação de profissionais de saúde.</Alert>
          </div>
        </div>

        <aside className="md:col-span-1">
          <Card className="md:sticky md:top-24">
            <p className="text-sm text-muted">Preço</p>
            <p className="font-display text-4xl font-bold tabular-nums">{brl(box.preco)}</p>
            <div className="mt-4 space-y-3">
              <Btn
                block
                onClick={() => {
                  adicionarAoCarrinho(box.id)
                  setAdicionada(true)
                }}
              >
                Adicionar ao carrinho
              </Btn>
              {adicionada ? (
                <Alert
                  variant="sucesso"
                  action={
                    <Link to="/carrinho" className="inline-flex min-h-12 items-center text-primary-dark underline">
                      Ver carrinho
                    </Link>
                  }
                >
                  Box adicionada ao carrinho.
                </Alert>
              ) : null}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

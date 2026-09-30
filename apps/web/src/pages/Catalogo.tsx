import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Card, EmptyState, Titulo } from '../components/ui'
import { boxes } from '../data/boxes'
import { brl } from '../lib/format'

export default function Catalogo() {
  return (
    <div>
      <Titulo apoio="Escolha uma box e veja quais brinquedos ela traz e o que cada um estimula.">
        Catálogo de boxes
      </Titulo>

      {boxes.length === 0 ? (
        <EmptyState titulo="Nenhuma box disponível no momento." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {boxes.map((b) => (
            <Card as="li" key={b.id} className="group flex flex-col p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 overflow-hidden rounded-card">
                <CapaBox box={b} className="h-36 group-hover:scale-105" />
              </div>
              <h2 className="text-xl">{b.nome}</h2>
              <p className="mt-1 flex-1 text-ink-soft">{b.descricao}</p>
              <p className="mt-2 text-sm text-ink-soft">{b.brinquedos.length} brinquedos</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums">{brl(b.preco)}</p>
              <div className="mt-4">
                <Btn to={`/loja/box/${b.id}`} variant="secondary" block>
                  Ver detalhes
                </Btn>
              </div>
            </Card>
          ))}
        </ul>
      )}
    </div>
  )
}

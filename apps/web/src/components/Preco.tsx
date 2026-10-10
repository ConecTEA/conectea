import type { Box } from '../data/boxes'
import { promocaoDaBox, precoFinal } from '../data/promocoes'
import { brl } from '../lib/format'

// Preço da box: mostra o valor cheio riscado e o selo da promoção ativa, se houver.
export function Preco({ box, grande = false }: { box: Box; grande?: boolean }) {
  const promo = promocaoDaBox(box.id)
  const final = precoFinal(box)
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={`font-display font-bold tabular-nums ${grande ? 'text-4xl' : 'text-2xl'}`}>{brl(final)}</span>
      {promo ? (
        <>
          <span className="text-sm text-ink-soft line-through tabular-nums">
            <span className="sr-only">Preço antes: </span>
            {brl(box.preco)}
          </span>
          <span className="rounded-full bg-coral px-2 py-0.5 text-sm font-bold text-ink">-{promo.desconto}%</span>
        </>
      ) : null}
    </p>
  )
}

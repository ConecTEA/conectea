import { boxes, type Box } from '../data/boxes'

// Capa geométrica de cada box: peças de encaixe com uma cor dominante.
// O esquema de cores vem da posição da box no catálogo, então toda box nova ganha uma capa.
const esquemas: [string, string, string][] = [
  ['fill-violet', 'fill-sun', 'fill-teal'],
  ['fill-coral', 'fill-violet', 'fill-teal'],
  ['fill-teal', 'fill-violet', 'fill-sun'],
  ['fill-sun', 'fill-coral', 'fill-violet'],
  ['fill-violet', 'fill-coral', 'fill-sun'],
  ['fill-teal', 'fill-sun', 'fill-coral'],
]

export function CapaBox({ box, className = 'h-32' }: { box: Box; className?: string }) {
  const i = Math.max(0, boxes.findIndex((b) => b.id === box.id))
  const [a, b, c] = esquemas[i % esquemas.length]
  // Pequenas variações de forma para as capas não parecerem iguais.
  const arredondado = i % 2 === 0 ? 14 : 35
  return (
    <div className={`overflow-hidden rounded-card transition-transform duration-300 ${box.cor} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <circle cx="70" cy="62" r="42" className={a} />
        <rect x="108" y="30" width="70" height="70" rx={arredondado} className={b} />
        <path d="M150 120a34 34 0 0 1 68 0z" className={c} />
        <circle cx="200" cy="26" r="9" className="fill-ink" />
      </svg>
    </div>
  )
}

import type { Box } from '../data/boxes'

// Capa geométrica de cada box: peças de encaixe com uma cor dominante.
const esquemas: Record<string, [string, string, string]> = {
  calma: ['fill-violet', 'fill-sun', 'fill-teal'],
  toque: ['fill-coral', 'fill-violet', 'fill-teal'],
  foco: ['fill-teal', 'fill-violet', 'fill-sun'],
  explorar: ['fill-sun', 'fill-coral', 'fill-violet'],
}

export function CapaBox({ box, className = 'h-32' }: { box: Box; className?: string }) {
  const [a, b, c] = esquemas[box.id] ?? esquemas.calma
  return (
    <div className={`overflow-hidden rounded-card transition-transform duration-300 ${box.cor} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <circle cx="70" cy="62" r="42" className={a} />
        <rect x="108" y="30" width="70" height="70" rx="14" className={b} />
        <path d="M150 120a34 34 0 0 1 68 0z" className={c} />
        <circle cx="200" cy="26" r="9" className="fill-ink" />
      </svg>
    </div>
  )
}

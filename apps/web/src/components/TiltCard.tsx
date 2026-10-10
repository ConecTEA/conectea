import { useRef, type PointerEvent, type ReactNode } from 'react'
import { movimentoReduzido } from '../lib/movimento'

// Inclina o cartão em até 6 graus e acende uma luz que segue o mouse.
// Só transform e opacity; desliga com movimento reduzido.
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || movimentoReduzido() || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.transform = `perspective(900px) rotateX(${(-(y - 0.5) * 6).toFixed(2)}deg) rotateY(${((x - 0.5) * 6).toFixed(2)}deg) translateY(-4px)`
  }

  const sair = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={sair}
      className={`luz-pai relative rounded-card transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
      <span className="luz" aria-hidden="true" />
    </div>
  )
}

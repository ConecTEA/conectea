import { useEffect, useRef, useState, type ReactNode } from 'react'
import { movimentoReduzido } from '../lib/movimento'

// Faz o bloco aparecer com fade e deslocamento de 16px ao entrar na tela (uma vez).
export function Reveal({
  children,
  atraso = 0,
  className = '',
}: {
  children: ReactNode
  atraso?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || movimentoReduzido() || typeof IntersectionObserver === 'undefined') {
      setVisivel(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`revelar ${visivel ? 'visivel' : ''} ${className}`}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </div>
  )
}

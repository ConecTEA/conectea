import { useEffect, useRef } from 'react'

// Barra fina no topo que mostra quanto da página já foi lida.
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let quadro = 0
    const atualizar = () => {
      cancelAnimationFrame(quadro)
      quadro = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const total = document.documentElement.scrollHeight - window.innerHeight
        el.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`
      })
    }
    atualizar()
    window.addEventListener('scroll', atualizar, { passive: true })
    window.addEventListener('resize', atualizar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', atualizar)
      window.removeEventListener('resize', atualizar)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-coral" />
    </div>
  )
}

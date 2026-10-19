import { useRef, type PointerEvent } from 'react'
import { movimentoReduzido } from './movimento'

// Parallax: grava --px e --py (de -1 a 1) no elemento conforme o mouse se move.
// Quem usa lê as variáveis em transform. Com movimento reduzido, não faz nada.
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onPointerMove = (e: PointerEvent<T>) => {
    const el = ref.current
    if (!el || movimentoReduzido()) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', String(((e.clientX - r.left) / r.width) * 2 - 1))
    el.style.setProperty('--py', String(((e.clientY - r.top) / r.height) * 2 - 1))
  }

  const onPointerLeave = () => {
    ref.current?.style.setProperty('--px', '0')
    ref.current?.style.setProperty('--py', '0')
  }

  return { ref, onPointerMove, onPointerLeave }
}

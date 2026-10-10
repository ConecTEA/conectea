import { movimentoReduzido } from './movimento'

// Uma peça colorida voa do botão até o ícone do carrinho (até 0,7s, uma vez).
export function voarParaCarrinho(origem: HTMLElement) {
  const destino = document.getElementById('carrinho-icone')
  if (!destino || movimentoReduzido()) return

  const a = origem.getBoundingClientRect()
  const b = destino.getBoundingClientRect()
  const peca = document.createElement('div')
  Object.assign(peca.style, {
    position: 'fixed',
    left: `${a.left + a.width / 2 - 14}px`,
    top: `${a.top + a.height / 2 - 14}px`,
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: 'var(--color-coral)',
    border: '3px solid var(--color-ink)',
    zIndex: '50',
    pointerEvents: 'none',
  })
  document.body.appendChild(peca)

  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  const anim = peca.animate(
    [
      { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(1.2) rotate(120deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.3) rotate(260deg)`, opacity: 0.2 },
    ],
    { duration: 700, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
  )
  anim.onfinish = () => peca.remove()
  // Garantia: se a aba estiver em segundo plano a animação pausa, então remove depois de um tempo.
  setTimeout(() => peca.remove(), 1500)
}

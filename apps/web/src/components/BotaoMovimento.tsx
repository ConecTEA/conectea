import { useState } from 'react'
import { aplicarMovimento, lerReduzido } from '../lib/movimento'

// Liga e desliga todas as animações do sistema. A escolha fica guardada no navegador.
export function BotaoMovimento({ escuro = false }: { escuro?: boolean }) {
  const [reduzido, setReduzido] = useState(lerReduzido)

  return (
    <button
      type="button"
      aria-pressed={reduzido}
      onClick={() => {
        aplicarMovimento(!reduzido)
        setReduzido(!reduzido)
      }}
      className={`inline-flex min-h-12 items-center rounded-xl border px-4 text-sm font-semibold ${
        escuro ? 'border-white/40 text-white hover:bg-white/10' : 'border-line text-ink hover:bg-lilac'
      }`}
    >
      {reduzido ? 'Animações desligadas' : 'Reduzir animações'}
    </button>
  )
}

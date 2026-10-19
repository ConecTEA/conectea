import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore } from '../store'
import { IconChevron } from './Icons'

// Botão de perfil no canto superior direito: escolher a criança ativa, editar o perfil e sair.
export function MenuPerfil() {
  const { usuario, criancas, criancaAtiva, selecionarCrianca, sair } = useStore()
  const nav = useNavigate()
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return
    const fora = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false)
    }
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    document.addEventListener('mousedown', fora)
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('mousedown', fora)
      document.removeEventListener('keydown', tecla)
    }
  }, [aberto])

  if (!usuario) return null
  const inicial = usuario.nome.trim().charAt(0).toUpperCase() || '?'
  const fechar = () => setAberto(false)
  const item =
    'flex min-h-12 w-full items-center rounded-xl px-3 text-left font-medium text-ink hover:bg-lilac'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-controls="menu-perfil"
        aria-label={`Perfil de ${usuario.nome}`}
        className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-line bg-surface py-1 pl-1 pr-3 transition hover:border-violet hover:shadow-md"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet font-display font-bold text-white">
          {inicial}
        </span>
        <span className="hidden max-w-[8rem] truncate font-semibold sm:inline">{usuario.nome.split(' ')[0]}</span>
        <IconChevron className={`h-4 w-4 transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>

      {aberto ? (
        <div
          id="menu-perfil"
          className="absolute right-0 top-full z-40 mt-2 w-72 rounded-card border-2 border-line bg-surface p-3 shadow-xl"
        >
          <div className="px-3 pb-3">
            <p className="font-display text-lg font-bold">{usuario.nome}</p>
            <p className="truncate text-sm text-ink-soft">{usuario.email}</p>
          </div>

          <div className="border-t-2 border-line pt-3">
            <p className="px-3 text-sm font-semibold text-ink-soft">Criança ativa</p>
            <ul className="mt-1 space-y-1">
              {criancas.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={criancaAtiva?.id === c.id}
                    onClick={() => selecionarCrianca(c.id)}
                    className={`flex min-h-12 w-full items-center justify-between gap-2 rounded-xl px-3 text-left font-medium ${
                      criancaAtiva?.id === c.id ? 'bg-lilac' : 'hover:bg-lilac'
                    }`}
                  >
                    <span>
                      {c.nome} <span className="text-sm text-ink-soft">· {c.idade} anos</span>
                    </span>
                    {criancaAtiva?.id === c.id ? <span aria-hidden="true">✓</span> : null}
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/criancas" onClick={fechar} className={`${item} mt-1 text-violet`}>
              Gerenciar crianças
            </Link>
          </div>

          <div className="mt-2 border-t-2 border-line pt-2">
            <Link to="/perfil" onClick={fechar} className={item}>
              Editar meu perfil
            </Link>
            <Link to="/assinatura/minha" onClick={fechar} className={item}>
              Minha assinatura
            </Link>
            <Link to="/pedidos" onClick={fechar} className={item}>
              Meus pedidos
            </Link>
            <button
              type="button"
              onClick={() => {
                fechar()
                sair()
                nav('/')
              }}
              className={`${item} text-alert`}
            >
              Sair
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

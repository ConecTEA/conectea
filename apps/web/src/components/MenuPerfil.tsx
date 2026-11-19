import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore } from '../store'
import { IconChevron } from './Icons'

// Botão de perfil no canto superior direito: escolher a criança ativa, editar o perfil e sair.
export function MenuPerfil({ sobreEscuro = false }: { sobreEscuro?: boolean }) {
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
    'flex min-h-12 w-full items-center rounded-full px-4 text-left font-bold text-ink hover:bg-lilac'

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-controls="menu-perfil"
        aria-label={`Perfil de ${usuario.nome}`}
        className={`inline-flex min-h-[52px] items-center gap-1.5 rounded-full border-2 bg-transparent py-1.5 pl-1.5 pr-3 sm:gap-2.5 sm:pr-5 transition hover:shadow-md ${
          aberto ? 'border-sun' : sobreEscuro ? 'border-white text-white' : 'border-[#E4DED3] text-ink'
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun font-display text-xl font-bold text-ink">
          {inicial}
        </span>
        <span className="hidden max-w-[8rem] truncate font-extrabold sm:inline">{usuario.nome.split(' ')[0]}</span>
        <IconChevron className={`h-4 w-4 transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>

      {aberto ? (
        <div
          id="menu-perfil"
          className="absolute right-0 top-full z-40 mt-2 w-[310px] rounded-[40px_40px_40px_12px] bg-surface p-4 text-ink shadow-[0_24px_48px_rgba(20,20,43,0.3)]"
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
                    className={`flex min-h-12 w-full items-center justify-between gap-2 rounded-full px-4 text-left font-bold ${
                      criancaAtiva?.id === c.id ? 'bg-sun' : 'hover:bg-lilac'
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

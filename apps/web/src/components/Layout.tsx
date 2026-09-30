import { useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { useStore } from '../store'
import { BotaoMovimento } from './BotaoMovimento'
import { IconCart, IconClose, IconMenu } from './Icons'
import { Logo } from './Logo'

const itens = [
  { to: '/inicio', rotulo: 'Início' },
  { to: '/loja', rotulo: 'Loja' },
  { to: '/crianca/perfil', rotulo: 'Minha criança' },
  { to: '/assinatura/minha', rotulo: 'Assinatura' },
  { to: '/atividades/historico', rotulo: 'Atividades' },
  { to: '/suporte', rotulo: 'Suporte' },
]

// Barra inferior (celular): os 5 destinos principais.
const barra = itens.slice(0, 5)

const link = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-12 items-center border-b-4 px-3 transition-colors ${
    isActive ? 'border-violet font-bold text-violet' : 'border-transparent font-medium text-ink hover:border-lilac'
  }`

export function Layout() {
  const { usuario, sair, quantidadeCarrinho } = useStore()
  const [aberto, setAberto] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()

  if (!usuario) return <Navigate to="/login" replace state={{ de: loc.pathname }} />

  const qtd = quantidadeCarrinho()
  const fazerSair = () => {
    sair()
    nav('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:p-3">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-20 border-b-2 border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
          <Logo />
          <nav aria-label="Principal" className="hidden items-center md:flex">
            {itens.map((i) => (
              <NavLink key={i.to} to={i.to} className={link}>
                {i.rotulo}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link
              to="/carrinho"
              className="relative inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-xl px-2 hover:bg-lilac"
              aria-label={`Carrinho, ${qtd} ${qtd === 1 ? 'item' : 'itens'}`}
            >
              <IconCart />
              <span
                key={qtd}
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-sm font-bold ${
                  qtd > 0 ? 'animate-pop bg-coral text-ink' : 'bg-lilac text-ink'
                }`}
              >
                {qtd}
              </span>
            </Link>
            <span className="hidden md:inline-flex">
              <BotaoMovimento />
            </span>
            <button
              type="button"
              onClick={fazerSair}
              className="hidden min-h-12 rounded-xl px-3 font-semibold hover:bg-lilac md:inline-flex md:items-center"
            >
              Sair
            </button>
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-movel"
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl hover:bg-lilac md:hidden"
            >
              <IconMenu />
              <span className="sr-only">Abrir menu</span>
            </button>
          </div>
        </div>
      </header>

      {aberto ? (
        <div id="menu-movel" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-30 flex flex-col bg-ink text-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Logo claro />
            <button
              type="button"
              onClick={() => setAberto(false)}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/40 px-3 font-semibold hover:bg-white/10"
            >
              <IconClose />
              Fechar
            </button>
          </div>
          <nav aria-label="Menu" className="flex flex-col p-4">
            {itens.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  `flex min-h-14 items-center border-b border-white/15 px-2 font-display text-xl ${isActive ? 'font-bold text-sun' : ''}`
                }
              >
                {i.rotulo}
              </NavLink>
            ))}
            <button type="button" onClick={fazerSair} className="flex min-h-14 items-center px-2 text-left font-display text-xl">
              Sair
            </button>
            <div className="mt-4">
              <BotaoMovimento escuro />
            </div>
          </nav>
        </div>
      ) : null}

      <main id="conteudo" className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 pb-28 md:pb-12">
        <div key={loc.pathname} className="tela-entra">
          <Outlet />
        </div>
      </main>

      <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-line bg-surface md:hidden">
        <ul className="grid h-16 grid-cols-5">
          {barra.map((i) => (
            <li key={i.to}>
              <NavLink
                to={i.to}
                className={({ isActive }) =>
                  `flex h-16 items-center justify-center border-t-4 px-1 text-center text-xs ${
                    isActive ? 'border-violet font-bold text-violet' : 'border-transparent font-medium'
                  }`
                }
              >
                {i.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function LayoutPublico() {
  const loc = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:p-3">
        Ir para o conteúdo
      </a>
      <header className="border-b-2 border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
          <Logo />
          <nav aria-label="Principal" className="flex items-center gap-1">
            <Link to="/login" className="inline-flex min-h-12 items-center rounded-xl px-3 font-semibold hover:bg-lilac">
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="inline-flex min-h-12 items-center rounded-xl border-2 border-violet bg-violet px-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-deep hover:shadow-md"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 md:py-12">
        <div key={loc.pathname} className="tela-entra">
          <Outlet />
        </div>
      </main>
      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo claro />
            <p className="text-sm text-white/80">Projeto acadêmico. Nenhum dado real é coletado nem cobrado.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/login" className="inline-flex min-h-12 items-center font-semibold underline">
              Suporte
            </Link>
            <BotaoMovimento escuro />
          </div>
        </div>
      </footer>
    </div>
  )
}

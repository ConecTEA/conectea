import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { useStore } from '../store'
import { Ajustes } from './BotaoMovimento'
import { IconCart, IconClose, IconMenu } from './Icons'
import { Logo } from './Logo'
import { MenuPerfil } from './MenuPerfil'
import { ScrollProgress } from './ScrollProgress'

type Item = { to: string; rotulo: string }

// Visitante: navega pela loja sem conta. Só pede login ao comprar.
const itensVisitante: Item[] = [
  { to: '/loja', rotulo: 'Loja' },
  { to: '/promocoes', rotulo: 'Promoções' },
  { to: '/tutoriais', rotulo: 'Tutoriais' },
  { to: '/assinatura/planos', rotulo: 'Planos' },
  { to: '/suporte', rotulo: 'Suporte' },
]

const itensLogado: Item[] = [
  { to: '/inicio', rotulo: 'Início' },
  { to: '/loja', rotulo: 'Loja' },
  { to: '/promocoes', rotulo: 'Promoções' },
  { to: '/acompanhamento', rotulo: 'Acompanhamento' },
  { to: '/tutoriais', rotulo: 'Tutoriais' },
  { to: '/assinatura/minha', rotulo: 'Assinatura' },
  { to: '/suporte', rotulo: 'Suporte' },
]

// Barra inferior (celular): cinco destinos.
const barraVisitante = [itensVisitante[0], itensVisitante[1], itensVisitante[2], itensVisitante[3], itensVisitante[4]]
const barraLogado = [itensLogado[0], itensLogado[1], itensLogado[2], itensLogado[3], itensLogado[4]]

// Link de atalho: foca o conteúdo sem mexer na rota (funciona também com HashRouter).
const irParaConteudo = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('conteudo')?.focus()
}

const link = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-12 items-center border-b-4 px-3 transition-colors ${
    isActive ? 'border-violet font-bold text-violet' : 'border-transparent font-medium text-ink hover:border-lilac'
  }`

// Só deixa passar quem entrou. Quem tenta comprar sem conta vai para o login e volta depois.
export function RotaPrivada() {
  const { usuario } = useStore()
  const loc = useLocation()
  if (!usuario) {
    const motivo = loc.pathname.startsWith('/checkout') ? 'compra' : 'acesso'
    return <Navigate to="/login" replace state={{ de: loc.pathname, motivo }} />
  }
  return <Outlet />
}

export function Layout() {
  const { usuario, sair, quantidadeCarrinho } = useStore()
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()

  // Cabeçalho encolhe e ganha sombra quando a página rola.
  useEffect(() => {
    const f = () => setRolou(window.scrollY > 8)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const itens = usuario ? itensLogado : itensVisitante
  const barra = usuario ? barraLogado : barraVisitante
  const qtd = quantidadeCarrinho()
  const fazerSair = () => {
    setAberto(false)
    sair()
    nav('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a href="#conteudo" onClick={irParaConteudo} className="sr-only focus:not-sr-only focus:p-3">
        Ir para o conteúdo
      </a>
      <header
        className={`sticky top-0 z-30 border-b-2 border-line bg-surface/95 backdrop-blur transition-shadow duration-300 ${
          rolou ? 'shadow-md' : ''
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 transition-all duration-300 ${
            rolou ? 'h-14' : 'h-16'
          }`}
        >
          <Logo />
          <nav aria-label="Principal" className="hidden items-center xl:flex">
            {itens.map((i) => (
              <NavLink key={i.to} to={i.to} className={link}>
                {i.rotulo}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link
              id="carrinho-icone"
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
            {usuario ? (
              <MenuPerfil />
            ) : (
              <span className="hidden items-center gap-1 xl:flex">
                <Link to="/login" className="inline-flex min-h-12 items-center rounded-xl px-3 font-semibold hover:bg-lilac">
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="brilho inline-flex min-h-12 items-center rounded-xl border-2 border-violet bg-violet px-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-deep hover:shadow-md"
                >
                  Criar conta
                </Link>
              </span>
            )}
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-movel"
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl hover:bg-lilac xl:hidden"
            >
              <IconMenu />
              <span className="sr-only">Abrir menu</span>
            </button>
          </div>
        </div>
      </header>

      {aberto ? (
        <div
          id="menu-movel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink text-white xl:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-4">
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
            {usuario ? (
              <>
                <NavLink to="/perfil" onClick={() => setAberto(false)} className="flex min-h-14 items-center border-b border-white/15 px-2 font-display text-xl">
                  Meu perfil
                </NavLink>
                <NavLink to="/criancas" onClick={() => setAberto(false)} className="flex min-h-14 items-center border-b border-white/15 px-2 font-display text-xl">
                  Minhas crianças
                </NavLink>
                <button type="button" onClick={fazerSair} className="flex min-h-14 items-center px-2 text-left font-display text-xl">
                  Sair
                </button>
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/cadastro" onClick={() => setAberto(false)} className="flex min-h-12 items-center justify-center rounded-xl bg-coral px-4 font-semibold text-ink">
                  Criar conta
                </Link>
                <Link to="/login" onClick={() => setAberto(false)} className="flex min-h-12 items-center justify-center rounded-xl border-2 border-white/40 px-4 font-semibold">
                  Entrar
                </Link>
              </div>
            )}
            <div className="mt-4">
              <Ajustes escuro />
            </div>
          </nav>
        </div>
      ) : null}

      <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 pb-28 md:pb-12">
        <div key={loc.pathname} className="tela-entra">
          <Outlet />
        </div>
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 pb-24 md:flex-row md:items-center md:justify-between md:pb-8">
          <div>
            <Logo claro />
            <p className="text-sm text-white/80">Projeto acadêmico. Nenhum dado real é coletado nem cobrado.</p>
          </div>
          <Ajustes escuro />
        </div>
      </footer>

      <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-surface md:hidden">
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

// Telas de entrada (login, cadastro, recuperar senha): cabeçalho enxuto.
export function LayoutPublico() {
  const loc = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" onClick={irParaConteudo} className="sr-only focus:not-sr-only focus:p-3">
        Ir para o conteúdo
      </a>
      <header className="border-b-2 border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
          <Logo />
          <nav aria-label="Principal" className="flex items-center gap-1">
            <Link to="/loja" className="inline-flex min-h-12 items-center rounded-xl px-3 font-medium hover:bg-lilac">
              Loja
            </Link>
            <Link to="/login" className="inline-flex min-h-12 items-center rounded-xl px-3 font-semibold hover:bg-lilac">
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="inline-flex min-h-12 items-center rounded-xl border-2 border-violet px-4 font-semibold text-violet hover:bg-lilac"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 md:py-12">
        <div key={loc.pathname} className="tela-entra">
          <Outlet />
        </div>
      </main>
      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>Projeto acadêmico. Nenhum dado real é coletado nem cobrado.</p>
          <Link to="/suporte" className="inline-flex min-h-12 items-center underline">
            Suporte
          </Link>
        </div>
      </footer>
    </div>
  )
}

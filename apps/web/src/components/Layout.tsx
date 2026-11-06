import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { useStore } from '../store'
import { Ajustes } from './BotaoMovimento'
import { BandaCtx, fundoBanda, Onda, textoBanda, type Banda } from './Banda'
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

// Link de atalho: foca o conteúdo sem mexer na rota (funciona também com HashRouter).
const irParaConteudo = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('conteudo')?.focus()
}

// Só deixa passar quem entrou. Quem tenta comprar sem conta vai para o login e volta depois.
export function RotaPrivada() {
  const { usuario, carregandoSessao } = useStore()
  const loc = useLocation()
  // Ao recarregar a página, espera o Supabase devolver a sessão antes de decidir mandar para o login.
  if (carregandoSessao) return <p className="p-8 text-center">Carregando...</p>
  if (!usuario) {
    const motivo = loc.pathname.startsWith('/checkout') ? 'compra' : 'acesso'
    return <Navigate to="/login" replace state={{ de: loc.pathname, motivo }} />
  }
  return <Outlet />
}

// O cabeçalho toma a cor da faixa da tela (a faixa é o componente Titulo).
function useBanda() {
  const [banda, setBanda] = useState<Banda | null>(null)
  const definir = useCallback((b: Banda | null) => setBanda(b), [])
  const cor = banda?.cor
  // Com faixa, o cabeçalho fica transparente por cima dela (o círculo decorativo passa por trás).
  const classes = cor ? textoBanda(cor) : 'bg-bg text-ink'
  const escura = banda ? !banda.escura : false
  return { banda, definir, classes, escura, temBanda: Boolean(cor) }
}

function Cabecalho({
  itens,
  classes,
  escura,
  temBanda,
  onMenu,
  aberto,
}: {
  itens: Item[]
  classes: string
  escura: boolean
  temBanda: boolean
  onMenu: () => void
  aberto: boolean
}) {
  const { usuario, quantidadeCarrinho } = useStore()
  const qtd = quantidadeCarrinho()
  const ativo = escura ? 'bg-sun text-ink' : 'bg-ink text-white'
  const link = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-extrabold transition-colors ${
      isActive ? ativo : escura ? 'hover:bg-white/15' : 'hover:bg-black/10'
    }`

  return (
    <header className={`${temBanda ? 'absolute inset-x-0 top-0' : 'relative'} z-30 ${classes}`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 py-4">
        <Logo claro={escura} />
        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
          {itens.map((i) => (
            <NavLink key={i.to} to={i.to} className={link}>
              {i.rotulo}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            id="carrinho-icone"
            to="/carrinho"
            className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-2"
            aria-label={`Carrinho, ${qtd} ${qtd === 1 ? 'item' : 'itens'}`}
          >
            <IconCart />
            <span
              key={qtd}
              className={`inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full px-1 text-sm font-extrabold ${
                qtd > 0 ? 'animate-pop bg-coral text-white' : escura ? 'bg-white/25 text-white' : 'bg-lilac text-ink'
              }`}
            >
              {qtd}
            </span>
          </Link>
          {usuario ? (
            <MenuPerfil sobreEscuro={escura} />
          ) : (
            <span className="hidden items-center gap-1 xl:flex">
              <Link to="/login" className="inline-flex min-h-12 items-center rounded-full px-3.5 font-extrabold">
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="brilho inline-flex min-h-12 items-center rounded-full bg-sun px-6 font-extrabold text-ink transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Criar conta
              </Link>
            </span>
          )}
          <button
            type="button"
            onClick={onMenu}
            aria-expanded={aberto}
            aria-controls="menu-movel"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full hover:bg-black/10 xl:hidden"
          >
            <IconMenu />
            <span className="sr-only">Abrir menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function Rodape({ publico = false }: { publico?: boolean }) {
  return (
    <footer>
      <div className="bg-bg">
        <Onda de="ink" invertida />
      </div>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            {publico ? null : <Logo claro />}
            <p className="text-sm text-white/80">Projeto acadêmico. Nenhum dado real é coletado nem cobrado.</p>
          </div>
          {publico ? (
            <Link to="/suporte" className="inline-flex min-h-12 items-center underline">
              Suporte
            </Link>
          ) : (
            <Ajustes escuro />
          )}
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const { usuario, sair } = useStore()
  const [aberto, setAberto] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const { definir, classes, escura, temBanda } = useBanda()

  useEffect(() => {
    setAberto(false)
  }, [loc.pathname])

  const itens = usuario ? itensLogado : itensVisitante
  const fazerSair = () => {
    setAberto(false)
    sair()
    nav('/')
  }
  const itemMovel = 'flex min-h-14 items-center border-b border-white/20 px-2 font-display text-[28px] font-bold'

  return (
    <BandaCtx.Provider value={{ definir }}>
      <div className="relative flex min-h-screen flex-col">
        <ScrollProgress />
        <a href="#conteudo" onClick={irParaConteudo} className="sr-only focus:not-sr-only focus:p-3">
          Ir para o conteúdo
        </a>
        <Cabecalho itens={itens} classes={classes} escura={escura} temBanda={temBanda} aberto={aberto} onMenu={() => setAberto(true)} />

        {aberto ? (
          <div
            id="menu-movel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-violet text-white xl:hidden"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-4">
              <Logo claro />
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/60 px-5 font-extrabold hover:bg-white/10"
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
                  className={({ isActive }) => `${itemMovel} ${isActive ? 'text-sun' : ''}`}
                >
                  {i.rotulo}
                </NavLink>
              ))}
              {usuario ? (
                <>
                  <NavLink to="/perfil" onClick={() => setAberto(false)} className={itemMovel}>
                    Meu perfil
                  </NavLink>
                  <NavLink to="/criancas" onClick={() => setAberto(false)} className={itemMovel}>
                    Minhas crianças
                  </NavLink>
                  <button type="button" onClick={fazerSair} className={`${itemMovel} text-left`}>
                    Sair
                  </button>
                </>
              ) : (
                <div className="mt-7 flex flex-col gap-3">
                  <Link to="/cadastro" onClick={() => setAberto(false)} className="flex min-h-[52px] items-center justify-center rounded-full bg-sun px-6 font-extrabold text-ink">
                    Criar conta
                  </Link>
                  <Link to="/login" onClick={() => setAberto(false)} className="flex min-h-[52px] items-center justify-center rounded-full border-2 border-white px-6 font-extrabold">
                    Entrar
                  </Link>
                </div>
              )}
              <div className="mt-6">
                <Ajustes escuro />
              </div>
            </nav>
          </div>
        ) : null}

        <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 pb-16">
          <div key={loc.pathname} className="tela-entra">
            <Outlet />
          </div>
        </main>

        <Rodape />
      </div>
    </BandaCtx.Provider>
  )
}

// Telas de entrada (login, cadastro, recuperar senha): mesma faixa colorida, menu enxuto.
export function LayoutPublico() {
  const loc = useLocation()
  const { definir, classes, escura, temBanda } = useBanda()
  const ativo = escura ? 'hover:bg-white/15' : 'hover:bg-black/10'
  return (
    <BandaCtx.Provider value={{ definir }}>
      <div className="relative flex min-h-screen flex-col">
        <a href="#conteudo" onClick={irParaConteudo} className="sr-only focus:not-sr-only focus:p-3">
          Ir para o conteúdo
        </a>
        <header className={`${temBanda ? 'absolute inset-x-0 top-0' : 'relative'} z-30 ${classes}`}>
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
            <Logo claro={escura} />
            <nav aria-label="Principal" className="flex items-center gap-1">
              <Link to="/loja" className={`inline-flex min-h-11 items-center rounded-full px-3.5 font-extrabold ${ativo}`}>
                Loja
              </Link>
              <Link to="/login" className={`inline-flex min-h-11 items-center rounded-full px-3.5 font-extrabold ${ativo}`}>
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex min-h-12 items-center rounded-full bg-sun px-6 font-extrabold text-ink hover:shadow-md"
              >
                Criar conta
              </Link>
            </nav>
          </div>
        </header>
        <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 pb-16">
          <div key={loc.pathname} className="tela-entra">
            <Outlet />
          </div>
        </main>
        <Rodape publico />
      </div>
    </BandaCtx.Provider>
  )
}

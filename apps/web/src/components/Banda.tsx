import { createContext, useContext, useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'

export type CorBanda = 'violet' | 'coral' | 'sun' | 'teal' | 'ink'

// Quem usa tinta escura sobre a cor (contraste AA): sol e coral. As demais usam branco.
const tintaEscura: Record<CorBanda, boolean> = { violet: false, coral: true, sun: true, teal: false, ink: false }

export type Banda = { cor: CorBanda; escura: boolean }

type Ctx = { definir: (b: Banda | null) => void }
export const BandaCtx = createContext<Ctx>({ definir: () => undefined })

const fundo: Record<CorBanda, string> = {
  violet: 'bg-violet',
  coral: 'bg-coral',
  sun: 'bg-sun',
  teal: 'bg-teal',
  ink: 'bg-ink',
}

export const fundoBanda = (cor: CorBanda) => fundo[cor]
export const textoBanda = (cor: CorBanda) => (tintaEscura[cor] ? 'text-ink' : 'text-white')

// Cor e frase manuscrita de cada tela, para não repetir em cada página.
const porRota: { prefixo: string; cor: CorBanda; olho: string }[] = [
  { prefixo: '/loja/box', cor: 'coral', olho: 'detalhes da box' },
  { prefixo: '/loja', cor: 'violet', olho: 'uma box para cada fase' },
  { prefixo: '/promocoes', cor: 'coral', olho: 'volte toda segunda' },
  { prefixo: '/carrinho', cor: 'sun', olho: 'quase lá' },
  { prefixo: '/checkout/endereco', cor: 'sun', olho: 'para onde enviamos' },
  { prefixo: '/checkout/pagamento', cor: 'sun', olho: 'falta pouco' },
  { prefixo: '/checkout/confirmacao', cor: 'teal', olho: 'obrigada pela compra' },
  { prefixo: '/pedidos', cor: 'violet', olho: 'tudo o que você pediu' },
  { prefixo: '/assinatura/planos', cor: 'teal', olho: 'uma box por mês' },
  { prefixo: '/assinatura/minha', cor: 'coral', olho: 'uma box por mês' },
  { prefixo: '/atividades/registrar', cor: 'teal', olho: 'em poucas palavras' },
  { prefixo: '/atividades/historico', cor: 'coral', olho: 'o caderno da criança' },
  { prefixo: '/acompanhamento', cor: 'violet', olho: 'no ritmo da criança' },
  { prefixo: '/perfil', cor: 'teal', olho: 'seus dados' },
  { prefixo: '/criancas/nova', cor: 'sun', olho: 'conte um pouco sobre ela' },
  { prefixo: '/criancas', cor: 'coral', olho: 'cada uma no seu tempo' },
  { prefixo: '/inicio', cor: 'violet', olho: 'que bom ter você aqui' },
  { prefixo: '/tutoriais', cor: 'teal', olho: 'no seu ritmo' },
  { prefixo: '/suporte', cor: 'coral', olho: 'estamos por aqui' },
  { prefixo: '/login', cor: 'violet', olho: 'que bom te ver de novo' },
  { prefixo: '/cadastro', cor: 'coral', olho: 'só o essencial' },
  { prefixo: '/recuperar-senha', cor: 'teal', olho: 'sem pressa' },
]

const preenchimento = { bg: 'fill-bg', ink: 'fill-ink', sun: 'fill-sun', violet: 'fill-violet', coral: 'fill-coral', teal: 'fill-teal' }

// Onda decorativa. O fundo atrás dela é a cor de cima; o desenho usa a cor de baixo.
export function Onda({ de, invertida = false, className = '' }: { de: keyof typeof preenchimento; invertida?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className={`block h-[70px] w-full ${className}`}>
      <path
        d={invertida ? 'M0 50C220 100 420 0 720 40S1200 90 1440 30V90H0Z' : 'M0 40C240 -10 480 90 760 40S1200 -10 1440 50V90H0Z'}
        className={preenchimento[de]}
      />
    </svg>
  )
}

// Para telas com faixa própria (como a Home): pinta o cabeçalho com a cor dela.
export function useDefinirBanda(cor: CorBanda) {
  const { definir } = useContext(BandaCtx)
  useLayoutEffect(() => {
    definir({ cor, escura: tintaEscura[cor] })
    return () => definir(null)
  }, [cor, definir])
}

// Faixa de página inteira (sai da coluna central) com onda no topo opcional.
export function Faixa({
  cor,
  className = '',
  children,
  ondaDe,
  ondaPara,
  invertida = false,
}: {
  cor: CorBanda | 'bg'
  className?: string
  children: ReactNode
  ondaDe?: CorBanda | 'bg'
  ondaPara?: CorBanda | 'bg'
  invertida?: boolean
}) {
  const cores = { ...fundo, bg: 'bg-bg' } as Record<string, string>
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {ondaDe ? (
        <div className={cores[ondaDe]}>
          <Onda de={cor === 'bg' ? 'bg' : cor} invertida={invertida} />
        </div>
      ) : null}
      <div className={`${cores[cor]} ${cor === 'bg' || tintaEscura[cor as CorBanda] ? 'text-ink' : 'text-white'} ${className}`}>
        <div className="mx-auto max-w-[1200px] px-4">{children}</div>
      </div>
      {ondaPara ? (
        <div className={cores[cor]}>
          <Onda de={ondaPara === 'bg' ? 'bg' : ondaPara} invertida={!invertida} />
        </div>
      ) : null}
    </div>
  )
}

export function useBandaDaRota() {
  const { pathname } = useLocation()
  return porRota.find((r) => pathname.startsWith(r.prefixo))
}

// Faixa colorida de abertura da tela (a cor do cabeçalho acompanha a faixa).
export function Titulo({
  children,
  apoio,
  olho,
  cor,
  acao,
}: {
  children: ReactNode
  apoio?: string
  olho?: string
  cor?: CorBanda
  acao?: ReactNode
}) {
  const padrao = useBandaDaRota()
  const c: CorBanda = cor ?? padrao?.cor ?? 'violet'
  const frase = olho ?? padrao?.olho
  const { definir } = useContext(BandaCtx)
  useLayoutEffect(() => {
    definir({ cor: c, escura: tintaEscura[c] })
    return () => definir(null)
  }, [c, definir])

  const claro = tintaEscura[c]
  return (
    <div className="relative left-1/2 mb-10 -mt-8 w-screen -translate-x-1/2">
      <div className={`relative overflow-hidden ${fundo[c]} ${textoBanda(c)}`}>
        <span className="pointer-events-none absolute -right-28 -top-44 h-[480px] w-[480px] rounded-full bg-white/15" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-32 -left-24 h-[260px] w-[260px] rounded-full bg-black/10" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-4 pb-12 pt-[112px]">
          <div className="min-w-0 flex-1">
            {frase ? (
              <p className={`font-hand text-2xl leading-tight ${claro ? 'text-violet' : 'text-sun'}`}>{frase}</p>
            ) : null}
            <h1 className={`mt-1 text-4xl md:text-6xl ${claro ? '[&_em]:text-violet' : '[&_em]:text-sun'}`}>{children}</h1>
            {apoio ? <p className="mt-3 max-w-[640px] text-lg md:text-xl">{apoio}</p> : null}
          </div>
          {acao ? <div className="shrink-0">{acao}</div> : null}
        </div>
      </div>
      <div className={fundo[c]}>
        <Onda de="bg" />
      </div>
    </div>
  )
}

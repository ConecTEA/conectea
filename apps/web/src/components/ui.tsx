import type { ReactNode } from 'react'
import { IconAlert, IconCheck, IconInfo } from './Icons'
import { Btn } from './Btn'

export { Titulo } from './Banda'

// Cartões de cantos grandes e assimétricos. Os tons fortes trazem o texto na cor certa.
const tons = {
  branco: 'bg-surface border-2 border-[#E9E3F8]',
  lilac: 'bg-lilac',
  peach: 'bg-peach',
  lemon: 'bg-lemon',
  aqua: 'bg-aqua',
  violet: 'bg-violet text-white',
  sun: 'bg-sun text-ink',
  coral: 'bg-coral text-ink',
  teal: 'bg-teal text-ink',
}

export function Card({
  children,
  className = '',
  as: Tag = 'section',
  tom = 'branco',
}: {
  children: ReactNode
  className?: string
  as?: 'section' | 'div' | 'article' | 'li'
  tom?: keyof typeof tons
}) {
  return <Tag className={`rounded-[48px_48px_48px_14px] p-7 ${tons[tom]} ${className}`}>{children}</Tag>
}

type AlertVariante = 'info' | 'sucesso' | 'alerta'

const alertaEstilo: Record<AlertVariante, { fundo: string; icone: ReactNode }> = {
  info: { fundo: 'bg-lilac', icone: <IconInfo className="text-violet" /> },
  sucesso: { fundo: 'bg-aqua', icone: <IconCheck className="text-success" /> },
  alerta: { fundo: 'bg-peach', icone: <IconAlert className="text-alert" /> },
}

// Aviso em pílula: ícone num círculo branco, sempre com texto (nunca só cor).
export function Alert({
  variant = 'info',
  children,
  action,
}: {
  variant?: AlertVariante
  children: ReactNode
  action?: ReactNode
}) {
  const e = alertaEstilo[variant]
  return (
    <div
      role={variant === 'alerta' ? 'alert' : 'status'}
      className={`flex flex-wrap items-center gap-3 rounded-[32px] py-3 pl-3 pr-6 ${e.fundo}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">{e.icone}</span>
      <div className="min-w-0 flex-1 leading-snug">{children}</div>
      {action}
    </div>
  )
}

export function Badge({ children, tom = 'neutro' }: { children: ReactNode; tom?: 'neutro' | 'sucesso' | 'atencao' }) {
  const tons = {
    neutro: 'bg-white text-ink',
    sucesso: 'bg-white text-success',
    atencao: 'bg-sun text-ink',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1 text-sm font-extrabold ${tons[tom]}`}>
      {tom === 'sucesso' ? <IconCheck width={14} height={14} className="text-success" /> : null}
      {children}
    </span>
  )
}

export function EmptyState({
  titulo,
  texto,
  acao,
  to,
}: {
  titulo: string
  texto?: string
  acao?: string
  to?: string
}) {
  return (
    <div className="mx-auto max-w-[720px] rounded-[64px_64px_64px_18px] bg-lilac p-10 text-center">
      <svg viewBox="0 0 220 150" className="mx-auto mb-3 h-36 w-52" aria-hidden="true">
        <path
          d="M110 3C176 0 217.8 42 213.4 81C209 123 158.4 148.5 101.2 145.5C39.6 142.5 2.2 111 6.6 69C11 30 52.8 4.5 110 3Z"
          className="fill-sun"
        />
        <circle cx="86" cy="62" r="26" className="fill-violet" />
        <rect x="104" y="58" width="44" height="44" rx="12" className="fill-coral" />
        <path d="M60 110a22 22 0 0 1 44 0z" className="fill-white" />
      </svg>
      <p className="font-display text-3xl font-bold">{titulo}</p>
      {texto ? <p className="mt-2 text-ink-soft">{texto}</p> : null}
      {acao && to ? (
        <div className="mt-6">
          <Btn to={to}>{acao}</Btn>
        </div>
      ) : null}
    </div>
  )
}

export function Stepper({ atual, passos }: { atual: number; passos: string[] }) {
  return (
    <nav aria-label="Etapas da compra" className="mb-8">
      <p className="font-semibold md:hidden">
        Passo {atual + 1} de {passos.length}: {passos[atual]}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-lilac md:hidden" aria-hidden="true">
        <div
          key={atual}
          className="progresso h-full rounded-full bg-violet"
          style={{ width: `${((atual + 1) / passos.length) * 100}%` }}
        />
      </div>
      <ol className="relative hidden md:grid md:grid-cols-4">
        <span className="absolute left-[12.5%] right-[12.5%] top-6 h-1 rounded-full bg-lilac" aria-hidden="true" />
        <span
          key={atual}
          className="progresso absolute left-[12.5%] top-6 h-1 rounded-full bg-violet"
          style={{ width: `${(atual / (passos.length - 1)) * 75}%` }}
          aria-hidden="true"
        />
        {passos.map((p, i) => (
          <li
            key={p}
            aria-current={i === atual ? 'step' : undefined}
            className="relative flex flex-col items-center gap-2 text-center text-sm"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-extrabold ${
                i < atual
                  ? 'border-violet bg-violet text-white'
                  : i === atual
                    ? 'border-ink bg-ink text-white'
                    : 'border-[#D5CDF0] bg-surface text-ink-soft'
              }`}
            >
              {i < atual ? '✓' : i + 1}
            </span>
            <span className={i === atual ? 'font-extrabold' : 'text-ink-soft'}>{p}</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

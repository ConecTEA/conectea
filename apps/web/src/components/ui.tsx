import type { ReactNode } from 'react'
import { IconAlert, IconCheck, IconInfo } from './Icons'
import { Btn } from './Btn'

const tons = {
  branco: 'bg-surface border-line',
  lilac: 'bg-lilac border-lilac',
  peach: 'bg-peach border-peach',
  lemon: 'bg-lemon border-lemon',
  aqua: 'bg-aqua border-aqua',
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
  return <Tag className={`rounded-card border-2 p-5 ${tons[tom]} ${className}`}>{children}</Tag>
}

type AlertVariante = 'info' | 'sucesso' | 'alerta'

const alertaEstilo: Record<AlertVariante, { borda: string; icone: ReactNode }> = {
  info: { borda: 'border-l-primary', icone: <IconInfo className="text-primary-dark" /> },
  sucesso: { borda: 'border-l-success', icone: <IconCheck className="text-success" /> },
  alerta: { borda: 'border-l-alert', icone: <IconAlert className="text-alert-dark" /> },
}

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
      className={`flex flex-wrap items-start gap-3 rounded-card border border-border border-l-4 bg-surface p-4 ${e.borda}`}
    >
      <span className="mt-0.5 shrink-0">{e.icone}</span>
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  )
}

export function Badge({ children, tom = 'neutro' }: { children: ReactNode; tom?: 'neutro' | 'sucesso' | 'atencao' }) {
  const tons = {
    neutro: 'border-line bg-lilac text-ink',
    sucesso: 'border-success bg-aqua text-ink',
    atencao: 'border-sun bg-lemon text-ink',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-0.5 text-sm font-semibold ${tons[tom]}`}>
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
    <div className="rounded-card border-2 border-dashed border-violet/40 bg-lilac/50 p-8 text-center">
      <svg viewBox="0 0 120 60" className="mx-auto mb-3 h-14 w-28" aria-hidden="true">
        <circle cx="34" cy="30" r="22" className="fill-violet" />
        <rect x="52" y="14" width="34" height="34" rx="8" className="fill-coral" />
        <path d="M72 60a22 22 0 0 1 44 0z" className="fill-sun" />
      </svg>
      <p className="font-display text-lg font-bold">{titulo}</p>
      {texto ? <p className="mt-1 text-muted">{texto}</p> : null}
      {acao && to ? (
        <div className="mt-4">
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
        <span className="absolute left-[12.5%] right-[12.5%] top-5 h-1 rounded-full bg-lilac" aria-hidden="true" />
        <span
          key={atual}
          className="progresso absolute left-[12.5%] top-5 h-1 rounded-full bg-violet"
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
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold ${
                i < atual
                  ? 'border-violet bg-violet text-white'
                  : i === atual
                    ? 'border-violet bg-surface text-violet'
                    : 'border-line bg-surface text-ink-soft'
              }`}
            >
              {i < atual ? '✓' : i + 1}
            </span>
            <span className={i === atual ? 'font-bold' : 'text-ink-soft'}>{p}</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Titulo({ children, apoio }: { children: ReactNode; apoio?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl md:text-4xl">{children}</h1>
      {apoio ? <p className="mt-2 text-muted">{apoio}</p> : null}
    </header>
  )
}

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type Variante = 'primary' | 'accent' | 'secondary' | 'light' | 'ghost' | 'danger' | 'ink'

const base =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 px-7 py-2 text-base font-extrabold transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none'

const variantes: Record<Variante, string> = {
  primary: 'brilho border-violet bg-violet text-white hover:border-violet-deep hover:bg-violet-deep',
  accent: 'brilho border-sun bg-sun text-ink hover:border-coral hover:bg-coral',
  ink: 'border-ink bg-ink text-white hover:bg-violet hover:border-violet',
  secondary: 'border-violet bg-surface text-violet hover:bg-lilac',
  light: 'border-white bg-transparent text-white hover:bg-white hover:text-violet-deep',
  ghost: 'border-ink bg-transparent text-ink hover:bg-lilac',
  danger: 'border-alert bg-alert text-white hover:bg-ink hover:border-ink',
}

type Props = {
  variant?: Variante
  block?: boolean
  to?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Btn({ variant = 'primary', block, to, children, className = '', ...rest }: Props) {
  const cls = `${base} ${variantes[variant]} ${block ? 'w-full' : ''} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} onClick={rest.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}

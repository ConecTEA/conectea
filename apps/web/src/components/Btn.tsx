import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type Variante = 'primary' | 'accent' | 'secondary' | 'light' | 'ghost' | 'danger'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-5 py-2 text-base font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none'

const variantes: Record<Variante, string> = {
  primary: 'brilho border-violet bg-violet text-white hover:border-violet-deep hover:bg-violet-deep',
  accent: 'brilho border-coral bg-coral text-ink hover:bg-sun hover:border-sun',
  secondary: 'border-violet bg-surface text-violet hover:bg-lilac',
  light: 'border-white bg-white text-violet-deep hover:bg-sun hover:border-sun hover:text-ink',
  ghost: 'border-line bg-transparent text-ink hover:bg-lilac',
  danger: 'border-alert bg-surface text-alert hover:bg-peach',
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


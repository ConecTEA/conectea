import { Link } from 'react-router'

// Marca: peças que se encaixam (círculo, quadrado e meia-lua). Na versão clara, sobre faixas escuras.
export function LogoMarca({ className = 'h-10 w-10', claro = false }: { className?: string; claro?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="11" className={claro ? 'fill-sun' : 'fill-violet'} />
      <rect x="20" y="16" width="18" height="18" rx="5" className="fill-coral" />
      <path d="M2 34a11 11 0 0 1 22 0z" className={claro ? 'fill-white' : 'fill-sun'} />
    </svg>
  )
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex min-h-12 items-center gap-2.5 font-display text-[28px] font-bold tracking-tight ${claro ? 'text-white' : 'text-ink'}`}
    >
      <LogoMarca claro={claro} />
      ConecTEA
    </Link>
  )
}

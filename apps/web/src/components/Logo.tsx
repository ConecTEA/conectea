import { Link } from 'react-router'

// Marca: peças que se encaixam (círculo, quadrado e meia-lua).
export function LogoMarca({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="11" className="fill-violet" />
      <rect x="20" y="16" width="18" height="18" rx="4" className="fill-coral" />
      <path d="M2 38a11 11 0 0 1 22 0z" className="fill-sun" transform="translate(0 -4)" />
    </svg>
  )
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex min-h-12 items-center gap-2 font-display text-xl font-bold ${claro ? 'text-white' : 'text-ink'}`}
    >
      <LogoMarca />
      ConecTEA
    </Link>
  )
}

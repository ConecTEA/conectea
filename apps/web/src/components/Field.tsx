import { useState, type ReactNode } from 'react'
import { IconAlert } from './Icons'

type Props = {
  label: string
  id: string
  error?: string
  help?: string
  required?: boolean
  as?: 'input' | 'textarea' | 'select'
  options?: string[]
  counter?: { atual: number; max: number }
  after?: ReactNode
  // demais atributos nativos (type, value, onChange, autoComplete, inputMode, maxLength...)
  [key: string]: unknown
}

const campo =
  'block min-h-14 w-full rounded-[20px] border-2 bg-surface px-[22px] py-3 text-base text-ink placeholder:text-ink-soft focus:border-violet'

export function Field({
  label,
  id,
  error,
  help,
  required,
  as = 'input',
  options,
  counter,
  after,
  ...rest
}: Props) {
  const helpId = help ? `${id}-ajuda` : undefined
  const errId = error ? `${id}-erro` : undefined
  const describedBy = [helpId, errId].filter(Boolean).join(' ') || undefined
  const props = {
    id,
    name: id,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: `${campo} ${error ? 'border-alert' : 'border-[#D5CDF0]'}`,
    ...rest,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-extrabold">
        {label}
        {required ? <span className="text-muted"> (obrigatório)</span> : <span className="text-muted"> (opcional)</span>}
      </label>
      {as === 'textarea' ? (
        <textarea rows={4} {...props} />
      ) : as === 'select' ? (
        <select {...props}>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...props} />
      )}
      {counter ? (
        <p className="mt-1 text-sm text-muted">
          {counter.atual} de {counter.max} caracteres
        </p>
      ) : null}
      {help ? (
        <p id={helpId} className="mt-1 text-sm text-muted">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errId} aria-live="polite" className="mt-1 flex items-center gap-1 text-sm font-medium text-alert-dark">
          <IconAlert width={16} height={16} />
          {error}
        </p>
      ) : (
        <span aria-live="polite" />
      )}
      {after}
    </div>
  )
}

type SenhaProps = {
  label: string
  id: string
  error?: string
  help?: string
  required?: boolean
  [key: string]: unknown
}

export function SenhaField(props: SenhaProps) {
  const [ver, setVer] = useState(false)
  return (
    <Field
      {...props}
      type={ver ? 'text' : 'password'}
      after={
        <button
          type="button"
          onClick={() => setVer((v) => !v)}
          aria-pressed={ver}
          className="mt-1 min-h-12 rounded-full px-2 text-sm font-extrabold text-violet underline"
        >
          {ver ? 'Ocultar senha' : 'Mostrar senha'}
        </button>
      }
    />
  )
}

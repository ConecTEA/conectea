import { useState } from 'react'
import { useLocation } from 'react-router'
import { Btn } from '../components/Btn'
import { Alert, Card, EmptyState } from '../components/ui'
import { dataBR } from '../lib/format'
import { useStore } from '../store'

export default function HistoricoAtividades() {
  const { atividades } = useStore()
  const loc = useLocation()
  const salvo = Boolean((loc.state as { salvo?: boolean } | null)?.salvo)
  const [abertas, setAbertas] = useState<number[]>([])

  const alternar = (id: number) =>
    setAbertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl">Histórico de atividades</h1>
        <Btn to="/atividades/registrar">Registrar nova atividade</Btn>
      </div>

      {salvo ? (
        <div className="mb-4">
          <Alert variant="sucesso">Atividade registrada.</Alert>
        </div>
      ) : null}

      {atividades.length === 0 ? (
        <EmptyState
          titulo="Você ainda não registrou atividades."
          texto="Anote o que foi feito depois de cada brincadeira."
          acao="Registrar atividade"
          to="/atividades/registrar"
        />
      ) : (
        <ol className="space-y-3">
          {atividades.map((a) => {
            const longa = a.descricao.length > 140
            const aberta = abertas.includes(a.id)
            return (
              <Card as="li" key={a.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <p className="shrink-0 font-semibold sm:w-28">{dataBR(a.data)}</p>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base">{a.atividade}</h2>
                    <p className={`mt-1 ${longa && !aberta ? 'line-clamp-3' : ''}`}>{a.descricao}</p>
                    {a.observacoes ? <p className="mt-1 text-muted">Obs.: {a.observacoes}</p> : null}
                    {longa ? (
                      <button
                        type="button"
                        onClick={() => alternar(a.id)}
                        aria-expanded={aberta}
                        className="mt-1 inline-flex min-h-12 items-center text-primary-dark underline"
                      >
                        {aberta ? 'Ver menos' : 'Ver mais'}
                      </button>
                    ) : null}
                  </div>
                </div>
              </Card>
            )
          })}
        </ol>
      )}
    </div>
  )
}

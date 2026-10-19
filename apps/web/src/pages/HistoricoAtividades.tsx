import { useState } from 'react'
import { useLocation } from 'react-router'
import { Btn } from '../components/Btn'
import { Alert, Card, EmptyState } from '../components/ui'
import { dataBR } from '../lib/format'
import { useStore } from '../store'

export default function HistoricoAtividades() {
  const { atividades, criancas } = useStore()
  const loc = useLocation()
  const salvo = Boolean((loc.state as { salvo?: boolean } | null)?.salvo)
  const [abertas, setAbertas] = useState<number[]>([])
  const [filtro, setFiltro] = useState<string>('todas')

  const alternar = (id: number) =>
    setAbertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  const lista = filtro === 'todas' ? atividades : atividades.filter((a) => a.criancaId === filtro)
  const nomeDe = (id?: string) => criancas.find((c) => c.id === id)?.nome

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl md:text-4xl">Histórico de atividades</h1>
        <Btn to="/atividades/registrar">Registrar nova atividade</Btn>
      </div>

      {salvo ? (
        <div className="mb-4">
          <Alert variant="sucesso">Atividade registrada.</Alert>
        </div>
      ) : null}

      {criancas.length > 1 ? (
        <div role="group" aria-label="Filtrar por criança" className="mb-4 flex flex-wrap gap-2">
          {[{ id: 'todas', nome: 'Todas' }, ...criancas].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filtro === c.id}
              onClick={() => setFiltro(c.id)}
              className={`min-h-12 rounded-full border-2 px-5 font-semibold transition ${
                filtro === c.id ? 'border-violet bg-violet text-white' : 'border-line bg-surface hover:bg-lilac'
              }`}
            >
              {c.nome}
            </button>
          ))}
        </div>
      ) : null}

      {lista.length === 0 ? (
        <EmptyState
          titulo="Você ainda não registrou atividades."
          texto="Anote o que foi feito depois de cada brincadeira."
          acao="Registrar atividade"
          to="/atividades/registrar"
        />
      ) : (
        <ol className="space-y-3">
          {lista.map((a) => {
            const longa = a.descricao.length > 140
            const aberta = abertas.includes(a.id)
            const nome = nomeDe(a.criancaId)
            return (
              <Card as="li" key={a.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <p className="shrink-0 font-semibold sm:w-28">{dataBR(a.data)}</p>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base">
                      {a.atividade}
                      {nome ? <span className="ml-2 rounded-full bg-lilac px-2 py-0.5 text-sm font-semibold">{nome}</span> : null}
                    </h2>
                    <p className={`mt-1 ${longa && !aberta ? 'line-clamp-3' : ''}`}>{a.descricao}</p>
                    {a.observacoes ? <p className="mt-1 text-ink-soft">Obs.: {a.observacoes}</p> : null}
                    {longa ? (
                      <button
                        type="button"
                        onClick={() => alternar(a.id)}
                        aria-expanded={aberta}
                        className="mt-1 inline-flex min-h-12 items-center text-violet underline"
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

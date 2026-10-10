import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { IconCheck } from '../components/Icons'
import { VideoTutorial } from '../components/VideoTutorial'
import { Alert, Card, EmptyState } from '../components/ui'
import { buscarBox } from '../data/boxes'
import { buscarTutorial, tutoriais } from '../data/tutoriais'

export default function Tutorial() {
  const { id } = useParams()
  const tutorial = buscarTutorial(id)
  const [feitos, setFeitos] = useState<number[]>([])

  if (!tutorial) {
    return (
      <div>
        <h1 className="mb-6 text-3xl">Tutorial não encontrado</h1>
        <EmptyState titulo="Tutorial não encontrado." acao="Ver tutoriais" to="/tutoriais" />
      </div>
    )
  }

  const box = buscarBox(tutorial.boxId)!
  const pct = Math.round((feitos.length / tutorial.passos.length) * 100)
  const alternar = (i: number) => setFeitos((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))
  const outros = tutoriais.filter((t) => t.id !== tutorial.id && t.boxId === tutorial.boxId).concat(
    tutoriais.filter((t) => t.id !== tutorial.id && t.boxId !== tutorial.boxId),
  ).slice(0, 3)

  return (
    <div>
      <p className="mb-2">
        <Link to="/tutoriais" className="inline-flex min-h-12 items-center text-violet underline">
          Voltar aos tutoriais
        </Link>
      </p>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <VideoTutorial tutorial={tutorial} box={box} />
          <p className="mt-6 text-sm font-semibold text-violet">
            {box.nome} · {tutorial.brinquedo}
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl">{tutorial.titulo}</h1>
          <p className="mt-3 text-lg">{tutorial.resumo}</p>

          <h2 className="mt-8 text-xl">Dicas</h2>
          <ul className="mt-3 space-y-2">
            {tutorial.dicas.map((d) => (
              <li key={d} className="rounded-card bg-lemon px-4 py-3">
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Alert variant="alerta">
              <p className="font-semibold">Cuidados</p>
              <ul className="mt-1 list-disc pl-5">
                {tutorial.cuidados.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Alert>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <Card className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl">Passo a passo</h2>
              <span className="font-display text-lg font-bold tabular-nums">{pct}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-lilac" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do tutorial">
              <div className="h-full rounded-full bg-violet transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <ol className="mt-5 space-y-3">
              {tutorial.passos.map((p, i) => {
                const ok = feitos.includes(i)
                return (
                  <li key={p}>
                    <label
                      className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-card border-2 p-3 transition ${
                        ok ? 'border-success bg-aqua' : 'border-line bg-surface hover:bg-lilac'
                      }`}
                    >
                      <input type="checkbox" checked={ok} onChange={() => alternar(i)} className="sr-only" />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-bold transition ${
                          ok ? 'border-success bg-success text-white' : 'border-violet text-violet'
                        }`}
                      >
                        {ok ? <IconCheck width={16} height={16} /> : i + 1}
                      </span>
                      <span className={ok ? 'text-ink-soft line-through' : ''}>{p}</span>
                    </label>
                  </li>
                )
              })}
            </ol>
            {pct === 100 ? (
              <div className="mt-4">
                <Alert variant="sucesso">Tudo certo! Que tal registrar a atividade no histórico?</Alert>
                <Link
                  to="/atividades/registrar"
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-violet px-5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-deep"
                >
                  Registrar atividade
                </Link>
              </div>
            ) : null}
          </Card>
        </aside>
      </div>

      <section className="mt-12" aria-labelledby="mais">
        <h2 id="mais" className="mb-4 text-2xl">
          Veja também
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {outros.map((t) => (
            <li key={t.id}>
              <Link
                to={`/tutoriais/${t.id}`}
                className="block h-full rounded-card border-2 border-line bg-surface p-4 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-violet">{t.brinquedo}</p>
                <p className="mt-1 font-display text-lg font-bold">{t.titulo}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.duracao}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

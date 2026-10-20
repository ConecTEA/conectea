import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { IconCheck } from '../components/Icons'
import { VideoTutorial } from '../components/VideoTutorial'
import { Btn } from '../components/Btn'
import { Alert, Card, EmptyState, Titulo } from '../components/ui'
import { buscarBox } from '../data/boxes'
import { buscarTutorial, tutoriais } from '../data/tutoriais'

export default function Tutorial() {
  const { id } = useParams()
  const tutorial = buscarTutorial(id)
  const [feitos, setFeitos] = useState<number[]>([])

  if (!tutorial) {
    return (
      <div>
        <Titulo olho="nada por aqui">Tutorial não encontrado</Titulo>
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
      <Titulo
        cor="violet"
        olho="← voltar aos tutoriais"
        acao={
          <Btn to="/tutoriais" variant="accent">
            ← Voltar aos tutoriais
          </Btn>
        }
      >
        {tutorial.titulo}
      </Titulo>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <VideoTutorial tutorial={tutorial} box={box} />
          <p className="mt-6 font-extrabold text-violet">
            {box.nome} · {tutorial.brinquedo}
          </p>
          <p className="mt-3 text-xl text-ink-soft">{tutorial.resumo}</p>

          <h2 className="mt-8 text-3xl">Dicas</h2>
          <ul className="mt-3 space-y-2">
            {tutorial.dicas.map((d) => (
              <li key={d} className="rounded-[28px] bg-lemon px-5 py-3">
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
              <h2 className="text-3xl">Passo a passo</h2>
              <span className="font-display text-2xl font-bold tabular-nums text-violet">{pct}%</span>
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
                      className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-[28px] border-2 p-3.5 transition ${
                        ok ? 'border-aqua bg-aqua' : 'border-[#E9E3F8] bg-surface hover:bg-lilac'
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
                  className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-violet px-6 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-violet-deep"
                >
                  Registrar atividade
                </Link>
              </div>
            ) : null}
          </Card>
        </aside>
      </div>

      <section className="mt-12" aria-labelledby="mais">
        <h2 id="mais" className="mb-5 text-4xl">
          Veja <em className="text-violet">também</em>
        </h2>
        <ul className="grid gap-5 sm:grid-cols-3">
          {outros.map((t, i) => (
            <li key={t.id}>
              <Link
                to={`/tutoriais/${t.id}`}
                className={`block h-full rounded-[40px_40px_40px_12px] p-6 transition hover:-translate-y-1 hover:shadow-lg ${['bg-lemon', 'bg-lilac', 'bg-aqua'][i % 3]}`}
              >
                <p className="text-sm font-extrabold">{t.brinquedo}</p>
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

import { useState } from 'react'
import { Link } from 'react-router'
import { CapaBox } from '../components/CapaBox'
import { IconPlay } from '../components/VideoTutorial'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Alert, Titulo } from '../components/ui'
import { boxes, buscarBox } from '../data/boxes'
import { tutoriais } from '../data/tutoriais'

export default function Tutoriais() {
  const [filtro, setFiltro] = useState<string>('todas')
  const lista = filtro === 'todas' ? tutoriais : tutoriais.filter((t) => t.boxId === filtro)
  const destaque = tutoriais[0]
  const boxDestaque = buscarBox(destaque.boxId)!

  return (
    <div>
      <Titulo apoio="Vídeos e passo a passo para brincar com os produtos das boxes, no seu ritmo.">
        Vídeos e tutoriais
      </Titulo>

      <div className="mb-6">
        <Alert variant="info">Os vídeos ainda estão em produção. Os textos são exemplos, em revisão pela equipe.</Alert>
      </div>

      {/* Destaque */}
      <Link
        to={`/tutoriais/${destaque.id}`}
        className="group mb-10 grid overflow-hidden rounded-[28px] bg-gradient-to-br from-violet via-violet-deep to-violet bg-[length:220%_220%] text-white animate-gradiente md:grid-cols-5"
      >
        <div className="flex flex-col justify-center gap-3 p-8 md:col-span-3 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-sun">Para começar</p>
          <h2 className="text-3xl md:text-4xl">{destaque.titulo}</h2>
          <p className="text-white/90">{destaque.resumo}</p>
          <span className="mt-2 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-white px-5 font-semibold text-violet-deep transition group-hover:bg-sun group-hover:text-ink">
            <IconPlay className="h-5 w-5" /> Assistir ({destaque.duracao})
          </span>
        </div>
        <div className="relative min-h-48 md:col-span-2">
          <CapaBox box={boxDestaque} className="absolute inset-0 h-full w-full rounded-none transition duration-500 group-hover:scale-105" />
        </div>
      </Link>

      {/* Filtros por box */}
      <div role="group" aria-label="Filtrar por box" className="mb-6 flex flex-wrap gap-2">
        {[{ id: 'todas', nome: 'Todas as boxes' }, ...boxes.map((b) => ({ id: b.id, nome: b.nome }))].map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtro === f.id}
            onClick={() => setFiltro(f.id)}
            className={`min-h-12 rounded-full border-2 px-5 font-semibold transition hover:-translate-y-0.5 ${
              filtro === f.id ? 'border-violet bg-violet text-white' : 'border-line bg-surface text-ink hover:bg-lilac'
            }`}
          >
            {f.nome}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((t, i) => {
          const box = buscarBox(t.boxId)!
          return (
            <li key={t.id}>
              <Reveal atraso={i * 50} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    to={`/tutoriais/${t.id}`}
                    className="group block h-full overflow-hidden rounded-card border-2 border-line bg-surface transition-shadow hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden">
                      <CapaBox box={box} className="h-40 rounded-none transition duration-500 group-hover:scale-105" />
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition group-hover:bg-ink/25">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-violet-deep shadow-md transition group-hover:scale-110">
                          <IconPlay className="ml-0.5 h-7 w-7" />
                        </span>
                      </span>
                      <span className="absolute bottom-2 right-2 rounded-full bg-ink px-3 py-0.5 text-sm font-semibold text-white">
                        {t.duracao}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-semibold text-violet">{box.nome}</p>
                      <h3 className="mt-1 text-lg">{t.titulo}</h3>
                      <p className="mt-1 text-sm text-ink-soft">{t.brinquedo}</p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

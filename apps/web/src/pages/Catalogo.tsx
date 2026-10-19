import { useSearchParams } from 'react-router'
import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Preco } from '../components/Preco'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Alert, Card, EmptyState, Titulo } from '../components/ui'
import { boxes, niveis, rotuloNiveis, type Nivel } from '../data/boxes'
import { promocaoDaBox } from '../data/promocoes'
import { nivelDaCrianca, useStore } from '../store'

const chip = (ativo: boolean) =>
  `min-h-12 rounded-full border-2 px-5 font-semibold transition hover:-translate-y-0.5 ${
    ativo ? 'border-violet bg-violet text-white' : 'border-line bg-surface text-ink hover:bg-lilac'
  }`

export default function Catalogo() {
  const [params, setParams] = useSearchParams()
  const { usuario, criancaAtiva } = useStore()
  const nivelParam = Number(params.get('nivel'))
  const filtro: Nivel | null = nivelParam === 1 || nivelParam === 2 || nivelParam === 3 ? nivelParam : null
  const lista = filtro ? boxes.filter((b) => b.niveis.includes(filtro)) : boxes
  const nivelDaAtiva = nivelDaCrianca(criancaAtiva)

  const escolher = (n: Nivel | null) => setParams(n ? { nivel: String(n) } : {}, { replace: true })

  return (
    <div>
      <Titulo apoio="Escolha por nível de suporte, veja os brinquedos de cada box e o que eles estimulam.">
        Catálogo de boxes
      </Titulo>

      <div role="group" aria-label="Filtrar por nível de suporte" className="mb-2 flex flex-wrap gap-2">
        <button type="button" aria-pressed={filtro === null} onClick={() => escolher(null)} className={chip(filtro === null)}>
          Todas ({boxes.length})
        </button>
        {niveis.map((n) => (
          <button
            key={n.nivel}
            type="button"
            aria-pressed={filtro === n.nivel}
            onClick={() => escolher(n.nivel)}
            className={chip(filtro === n.nivel)}
          >
            {n.nome} ({boxes.filter((b) => b.niveis.includes(n.nivel)).length})
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm text-ink-soft">
        {filtro ? niveis.find((n) => n.nivel === filtro)?.resumo + '. ' : ''}
        Os níveis são uma sugestão de uso e não substituem a orientação de profissionais de saúde.
      </p>

      {usuario && criancaAtiva && nivelDaAtiva && filtro !== nivelDaAtiva ? (
        <div className="mb-6">
          <Alert
            variant="info"
            action={
              <Btn variant="secondary" onClick={() => escolher(nivelDaAtiva)}>
                Ver nível {nivelDaAtiva}
              </Btn>
            }
          >
            Para {criancaAtiva.nome}, que está no nível {nivelDaAtiva}, veja as boxes sugeridas.
          </Alert>
        </div>
      ) : null}

      {lista.length === 0 ? (
        <EmptyState titulo="Nenhuma box neste nível." acao="Ver todas" to="/loja" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lista.map((b, i) => (
            <li key={b.id}>
              <Reveal atraso={(i % 4) * 50} className="h-full">
                <TiltCard className="h-full">
                  <Card as="div" className="group relative flex h-full flex-col p-4 transition-shadow duration-300 hover:shadow-lg">
                    {promocaoDaBox(b.id) ? (
                      <span className="absolute left-6 top-6 z-10 rounded-full bg-coral px-3 py-0.5 text-sm font-bold text-ink">
                        Promoção
                      </span>
                    ) : null}
                    <div className="mb-4 overflow-hidden rounded-card">
                      <CapaBox box={b} className="h-36 group-hover:scale-105" />
                    </div>
                    <p className="text-sm font-semibold text-violet">{rotuloNiveis(b.niveis)}</p>
                    <h2 className="text-xl">{b.nome}</h2>
                    <p className="mt-1 text-sm font-medium text-ink-soft">{b.foco}</p>
                    <p className="mt-1 flex-1 text-ink-soft">{b.descricao}</p>
                    <p className="mt-2 text-sm text-ink-soft">{b.brinquedos.length} brinquedos</p>
                    <Preco box={b} />
                    <div className="mt-4">
                      <Btn to={`/loja/box/${b.id}`} variant="secondary" block>
                        Ver detalhes
                      </Btn>
                    </div>
                  </Card>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

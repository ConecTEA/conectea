import { useState } from 'react'
import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { IconPlay } from '../components/VideoTutorial'
import { Reveal } from '../components/Reveal'
import { Alert, Card, EmptyState, Titulo } from '../components/ui'
import { boxes, boxesDoNivel, rotuloNiveis } from '../data/boxes'
import { tutorialDoBrinquedo } from '../data/tutoriais'
import { dataBR, hojeISO } from '../lib/format'
import { nivelDaCrianca, useStore } from '../store'

const DIA = 24 * 60 * 60 * 1000
const paraData = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
}
const iso = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
const SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const dicasGerais = [
  'Escolha um momento calmo do dia e um lugar fixo para a atividade.',
  'Comece com poucos minutos. É melhor terminar com vontade de repetir.',
  'Deixe a criança escolher o item e o ritmo. Acompanhe, sem forçar.',
  'Se houver desconforto, pare e tente de novo outro dia.',
  'Registre o que aconteceu: com o tempo, você enxerga o que funciona.',
]

export default function Acompanhamento() {
  const { criancas, criancaAtiva, selecionarCrianca, atividades, pedidos, assinatura } = useStore()
  const [boxEscolhida, setBoxEscolhida] = useState<string | null>(null)

  if (!criancaAtiva) {
    return (
      <div>
        <Titulo>Acompanhamento</Titulo>
        <EmptyState
          titulo="Cadastre uma criança para acompanhar."
          texto="Assim você vê as atividades e as sugestões de box."
          acao="Adicionar criança"
          to="/criancas/nova"
        />
      </div>
    )
  }

  const nivel = nivelDaCrianca(criancaAtiva)
  const minhas = atividades.filter((a) => a.criancaId === criancaAtiva.id)
  const hoje = paraData(hojeISO())

  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hoje.getTime() - (6 - i) * DIA)
    return { d, feito: minhas.some((a) => a.data === iso(d)) }
  })
  const naSemana = dias.filter((x) => x.feito).length
  const ultima = minhas[0]
  const diasDesde = ultima ? Math.round((hoje.getTime() - paraData(ultima.data).getTime()) / DIA) : null

  // Boxes que a família já tem: pedidos e próxima box da assinatura.
  const nomes = new Set<string>([
    ...pedidos.flatMap((p) => p.itens.map((i) => i.nome)),
    ...(assinatura ? [assinatura.proximaBox] : []),
  ])
  const minhasBoxes = boxes.filter((b) => nomes.has(b.nome))
  const boxAtual = minhasBoxes.find((b) => b.id === boxEscolhida) ?? minhasBoxes[0] ?? null
  const sugeridas = boxesDoNivel(nivel).filter((b) => !nomes.has(b.nome)).slice(0, 3)

  return (
    <div>
      <Titulo apoio="Veja como está indo, receba dicas de uso e escolha o próximo passo.">Acompanhamento</Titulo>

      {/* Escolher a criança */}
      <div role="group" aria-label="Escolher criança" className="mb-6 flex flex-wrap gap-2">
        {criancas.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={criancaAtiva.id === c.id}
            onClick={() => selecionarCrianca(c.id)}
            className={`min-h-12 rounded-full border-2 px-5 font-semibold transition hover:-translate-y-0.5 ${
              criancaAtiva.id === c.id ? 'border-violet bg-violet text-white' : 'border-line bg-surface hover:bg-lilac'
            }`}
          >
            {c.nome}
          </button>
        ))}
        <Link
          to="/criancas/nova"
          className="inline-flex min-h-12 items-center rounded-full border-2 border-dashed border-violet px-5 font-semibold text-violet hover:bg-lilac"
        >
          + Adicionar criança
        </Link>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card tom="lilac" className="min-w-0 md:col-span-1">
          <p className="text-sm font-semibold text-violet">Criança</p>
          <h2 className="text-2xl">{criancaAtiva.nome}</h2>
          <p className="text-ink-soft">
            {criancaAtiva.idade} anos · {criancaAtiva.diagnostico}
          </p>
          {criancaAtiva.gostos ? <p className="mt-2 text-sm">Gosta de: {criancaAtiva.gostos}</p> : null}
        </Card>

        <Card tom="lemon" className="min-w-0 md:col-span-2">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-violet">Últimos 7 dias</p>
              <h2 className="text-2xl">
                {naSemana} {naSemana === 1 ? 'dia com atividade' : 'dias com atividade'}
              </h2>
              <p className="text-ink-soft">
                {diasDesde === null
                  ? 'Nenhuma atividade registrada ainda.'
                  : diasDesde === 0
                    ? 'Última atividade: hoje.'
                    : `Última atividade: há ${diasDesde} ${diasDesde === 1 ? 'dia' : 'dias'} (${dataBR(ultima.data)}).`}
              </p>
            </div>
            <ul className="flex w-full justify-between gap-1 sm:w-auto sm:gap-2" aria-label="Dias com atividade nos últimos 7 dias">
              {dias.map((x, i) => (
                <li key={i} className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold transition sm:h-10 sm:w-10 ${
                      x.feito ? 'border-violet bg-violet text-white' : 'border-line bg-surface text-ink-soft'
                    }`}
                  >
                    {x.feito ? '✓' : ''}
                    <span className="sr-only">
                      {dataBR(iso(x.d))}: {x.feito ? 'houve atividade' : 'sem atividade'}
                    </span>
                  </span>
                  <span className="text-xs text-ink-soft" aria-hidden="true">
                    {SEMANA[x.d.getDay()]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn to="/atividades/registrar">Registrar atividade</Btn>
            <Btn to="/atividades/historico" variant="secondary">
              Ver histórico
            </Btn>
          </div>
        </Card>
      </div>

      {/* Dicas de como usar a box */}
      <section className="mt-12" aria-labelledby="dicas">
        <h2 id="dicas" className="text-2xl md:text-3xl">
          Dicas de como usar a box
        </h2>

        {minhasBoxes.length === 0 ? (
          <div className="mt-4">
            <EmptyState titulo="Você ainda não tem uma box." texto="Quando comprar, as dicas aparecem aqui." acao="Ver boxes" to="/loja" />
          </div>
        ) : (
          <>
            <div role="group" aria-label="Escolher box" className="mt-4 flex flex-wrap gap-2">
              {minhasBoxes.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={boxAtual?.id === b.id}
                  onClick={() => setBoxEscolhida(b.id)}
                  className={`min-h-12 rounded-full border-2 px-5 font-semibold transition hover:-translate-y-0.5 ${
                    boxAtual?.id === b.id ? 'border-violet bg-violet text-white' : 'border-line bg-surface hover:bg-lilac'
                  }`}
                >
                  {b.nome}
                </button>
              ))}
            </div>

            {boxAtual ? (
              <div className="mt-5 grid gap-5 lg:grid-cols-5">
                <Card className="lg:col-span-2">
                  <p className="text-sm font-semibold text-violet">{rotuloNiveis(boxAtual.niveis)}</p>
                  <h3 className="text-xl">{boxAtual.nome}</h3>
                  <p className="text-ink-soft">{boxAtual.foco}</p>
                  <ol className="mt-4 space-y-3">
                    {boxAtual.dicas.map((d, i) => (
                      <li key={d} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
                <Card className="lg:col-span-3">
                  <h3 className="text-xl">Brinquedos desta box</h3>
                  <ul className="mt-3 space-y-2">
                    {boxAtual.brinquedos.map((b) => {
                      const tut = tutorialDoBrinquedo(b.nome)
                      return (
                        <li key={b.nome} className="flex flex-wrap items-center justify-between gap-2 rounded-card bg-bg px-4 py-3">
                          <span>
                            <span className="font-medium">{b.nome}</span>
                            <span className="block text-sm text-ink-soft">{b.estimulo}</span>
                          </span>
                          {tut ? (
                            <Link
                              to={`/tutoriais/${tut.id}`}
                              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-violet px-4 font-semibold text-violet hover:bg-lilac"
                            >
                              <IconPlay className="h-5 w-5" /> Tutorial
                            </Link>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </Card>
              </div>
            ) : null}
          </>
        )}

        <div className="mt-6">
          <Alert variant="info">
            <p className="font-semibold">Dicas para qualquer box</p>
            <ul className="mt-1 list-disc pl-5">
              {dicasGerais.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm">Conteúdo informativo. Não substitui orientação de profissionais de saúde.</p>
          </Alert>
        </div>
      </section>

      {/* Próximas boxes sugeridas */}
      {sugeridas.length > 0 ? (
        <section className="mt-12" aria-labelledby="sug">
          <h2 id="sug" className="text-2xl md:text-3xl">
            Boxes sugeridas para {criancaAtiva.nome}
          </h2>
          <p className="mt-1 text-ink-soft">
            {nivel ? `Boxes do nível ${nivel}, que você ainda não tem.` : 'Veja algumas boxes do catálogo.'}
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {sugeridas.map((b, i) => (
              <li key={b.id}>
                <Reveal atraso={i * 60} className="h-full">
                  <Link
                    to={`/loja/box/${b.id}`}
                    className="block h-full rounded-card border-2 border-line bg-surface p-4 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-sm font-semibold text-violet">{rotuloNiveis(b.niveis)}</p>
                    <p className="font-display text-lg font-bold">{b.nome}</p>
                    <p className="text-sm text-ink-soft">{b.foco}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

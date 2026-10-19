import { useState } from 'react'
import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Alert, Badge, Card, EmptyState } from '../components/ui'
import { boxesDoNivel } from '../data/boxes'
import { nivelDaCrianca, useStore } from '../store'

const cores = ['bg-violet', 'bg-coral', 'bg-teal', 'bg-sun']

export default function Criancas() {
  const { criancas, criancaAtiva, selecionarCrianca, removerCrianca, atividades } = useStore()
  const [confirmando, setConfirmando] = useState<string | null>(null)
  const [aviso, setAviso] = useState('')

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl">Minhas crianças</h1>
          <p className="mt-2 text-ink-soft">Cadastre quantas crianças quiser. A criança ativa orienta as sugestões de box e o acompanhamento.</p>
        </div>
        <Btn to="/criancas/nova">Adicionar criança</Btn>
      </div>

      <div className="mb-4">
        <Alert variant="info">Nesta versão de demonstração, use apenas dados fictícios.</Alert>
      </div>
      {aviso ? (
        <div className="mb-4">
          <Alert variant="sucesso">{aviso}</Alert>
        </div>
      ) : null}

      {criancas.length === 0 ? (
        <EmptyState
          titulo="Nenhuma criança cadastrada."
          texto="Cadastre para receber sugestões de box."
          acao="Adicionar criança"
          to="/criancas/nova"
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {criancas.map((c, i) => {
            const nivel = nivelDaCrianca(c)
            const sugeridas = boxesDoNivel(nivel).length
            const ativa = criancaAtiva?.id === c.id
            const total = atividades.filter((a) => a.criancaId === c.id).length
            return (
              <Card as="li" key={c.id} tom={ativa ? 'lilac' : 'branco'}>
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-2xl font-bold text-white ${cores[i % cores.length]}`}
                    aria-hidden="true"
                  >
                    {c.nome.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl">{c.nome}</h2>
                      {ativa ? <Badge tom="sucesso">Ativa</Badge> : null}
                    </div>
                    <p className="text-ink-soft">{c.idade} anos · {c.diagnostico}</p>
                    {c.gostos ? <p className="mt-1 text-sm">Gosta de: {c.gostos}</p> : null}
                    <p className="mt-1 text-sm text-ink-soft">
                      {total} {total === 1 ? 'atividade registrada' : 'atividades registradas'}
                    </p>
                  </div>
                </div>

                {nivel ? (
                  <p className="mt-3 text-sm">
                    <Link to={`/loja?nivel=${nivel}`} className="font-semibold text-violet underline">
                      Ver {sugeridas} boxes do nível {nivel}
                    </Link>
                  </p>
                ) : null}

                {confirmando === c.id ? (
                  <div className="mt-4 rounded-card border-2 border-alert bg-surface p-3">
                    <p className="font-medium">Remover {c.nome}? As atividades registradas dessa criança também serão removidas.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Btn
                        variant="danger"
                        onClick={() => {
                          removerCrianca(c.id)
                          setConfirmando(null)
                          setAviso(`${c.nome} foi removida.`)
                        }}
                      >
                        Sim, remover
                      </Btn>
                      <Btn variant="ghost" onClick={() => setConfirmando(null)}>
                        Cancelar
                      </Btn>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {!ativa ? (
                      <Btn variant="secondary" onClick={() => selecionarCrianca(c.id)}>
                        Usar esta criança
                      </Btn>
                    ) : null}
                    <Btn to={`/criancas/${c.id}/editar`} variant="ghost">
                      Editar
                    </Btn>
                    <Btn variant="ghost" onClick={() => setConfirmando(c.id)}>
                      Remover
                    </Btn>
                  </div>
                )}
              </Card>
            )
          })}
        </ul>
      )}
    </div>
  )
}

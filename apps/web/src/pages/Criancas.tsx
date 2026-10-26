import { useState } from 'react'
import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Alert, Badge, Card, EmptyState, Titulo } from '../components/ui'
import { boxesDoNivel } from '../data/boxes'
import { nivelDaCrianca, useStore } from '../store'

export default function Criancas() {
  const { criancas, criancaAtiva, selecionarCrianca, removerCrianca, atividades } = useStore()
  const [confirmando, setConfirmando] = useState<string | null>(null)
  const [aviso, setAviso] = useState('')

  return (
    <>
    <Titulo
      apoio="Cadastre quantas crianças quiser. A criança ativa orienta as sugestões de box e o acompanhamento."
      acao={<Btn to="/criancas/nova" variant="ink">Adicionar criança</Btn>}
    >
      Minhas crianças
    </Titulo>
    <div className="mx-auto max-w-[1000px]">
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
        <ul className="mt-6 grid items-start gap-6 sm:grid-cols-2">
          {criancas.map((c, i) => {
            const nivel = nivelDaCrianca(c)
            const sugeridas = boxesDoNivel(nivel).length
            const ativa = criancaAtiva?.id === c.id
            const total = atividades.filter((a) => a.criancaId === c.id).length
            return (
              <Card as="li" key={c.id} tom={i % 2 === 0 ? 'violet' : 'sun'} className={i % 2 === 1 ? 'sm:mt-8' : ''}>
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full font-display text-3xl font-bold ${i % 2 === 0 ? 'bg-sun text-ink' : 'bg-violet text-white'}`}
                    aria-hidden="true"
                  >
                    {c.nome.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-3xl">{c.nome}</h2>
                      {ativa ? <Badge tom="sucesso">Ativa</Badge> : null}
                    </div>
                    <p>{c.idade} anos · {c.diagnostico}</p>
                    {c.gostos ? <p className="mt-1 text-sm">Gosta de: {c.gostos}</p> : null}
                    <p className="mt-1 text-sm">
                      {total} {total === 1 ? 'atividade registrada' : 'atividades registradas'}
                    </p>
                  </div>
                </div>

                {nivel ? (
                  <p className="mt-3 text-sm">
                    <Link to={`/loja?nivel=${nivel}`} className="font-extrabold underline">
                      Ver {sugeridas} boxes do nível {nivel}
                    </Link>
                  </p>
                ) : null}

                {confirmando === c.id ? (
                  <div className="mt-4 rounded-[32px] bg-white p-4 text-ink">
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
                      <Btn variant={i % 2 === 0 ? 'accent' : 'ink'} className="min-h-11 px-5 text-sm" onClick={() => selecionarCrianca(c.id)}>
                        Usar esta criança
                      </Btn>
                    ) : null}
                    <Btn to={`/criancas/${c.id}/editar`} variant="light" className="min-h-11 bg-white px-5 text-sm !text-ink">
                      Editar
                    </Btn>
                    <Btn variant="light" className="min-h-11 bg-white px-5 text-sm !text-alert" onClick={() => setConfirmando(c.id)}>
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
    </>
  )
}

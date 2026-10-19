import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Preco } from '../components/Preco'
import { Badge, Card } from '../components/ui'
import { boxesDoNivel } from '../data/boxes'
import { buscarPlano } from '../data/exemplos'
import { promocaoDaSemana } from '../data/promocoes'
import { buscarBox } from '../data/boxes'
import { brl, dataBR } from '../lib/format'
import { nivelDaCrianca, useStore } from '../store'

function Vazio({ texto }: { texto: string }) {
  return <p className="rounded-card border-2 border-dashed border-violet/40 bg-surface/60 p-3 text-ink-soft">{texto}</p>
}

export default function Inicio() {
  const { usuario, criancas, criancaAtiva, assinatura, pedidos, atividades } = useStore()
  const plano = buscarPlano(assinatura?.planoId)
  const ultimo = pedidos[0]
  const recentes = atividades.filter((a) => a.criancaId === criancaAtiva?.id).slice(0, 3)
  const nivel = nivelDaCrianca(criancaAtiva)
  const sugerida = boxesDoNivel(nivel)[0]
  const semana = promocaoDaSemana()
  const boxSemana = buscarBox(semana.boxId)!

  return (
    <div>
      <h1 className="mb-6 text-3xl md:text-5xl">Olá, {usuario?.nome.split(' ')[0]}</h1>

      {/* Promoção da semana: um motivo para voltar */}
      <Link
        to="/promocoes"
        className="brilho group mb-6 flex flex-wrap items-center justify-between gap-4 rounded-card bg-gradient-to-r from-coral via-sun to-coral bg-[length:220%_220%] p-5 text-ink animate-gradiente"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-widest">Promoção da semana</p>
          <p className="font-display text-xl font-bold md:text-2xl">
            {semana.titulo}: {boxSemana.nome} com {semana.desconto}% de desconto
          </p>
        </div>
        <span className="flex items-center gap-3 rounded-xl bg-white/85 px-4 py-2">
          <Preco box={boxSemana} />
          <span className="font-semibold underline group-hover:no-underline">Ver</span>
        </span>
      </Link>

      <div className="grid gap-4 md:grid-cols-2">
        <Card tom="lilac" className="flex flex-col">
          <h2 className="text-xl">{criancas.length > 1 ? 'Minhas crianças' : 'Minha criança'}</h2>
          <div className="mt-3 flex-1">
            {criancaAtiva ? (
              <>
                <p>
                  <span className="font-semibold">{criancaAtiva.nome}</span>, {criancaAtiva.idade} anos
                  <span className="ml-2 text-sm text-ink-soft">(ativa)</span>
                </p>
                {criancas.length > 1 ? (
                  <p className="mt-1 text-sm text-ink-soft">
                    Também: {criancas.filter((c) => c.id !== criancaAtiva.id).map((c) => c.nome).join(', ')}
                  </p>
                ) : null}
              </>
            ) : (
              <Vazio texto="Nenhuma criança cadastrada." />
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn to="/criancas" variant="secondary">
              {criancaAtiva ? 'Gerenciar crianças' : 'Cadastrar criança'}
            </Btn>
            {criancaAtiva ? (
              <Btn to="/criancas/nova" variant="ghost">
                Adicionar
              </Btn>
            ) : null}
          </div>
        </Card>

        <Card tom="aqua" className="flex flex-col">
          <h2 className="text-xl">Minha assinatura</h2>
          <div className="mt-3 flex-1">
            {plano && assinatura ? (
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Plano {plano.nome}</span>
                <Badge tom="sucesso">Ativa</Badge>
              </p>
            ) : (
              <Vazio texto="Você não tem assinatura ativa." />
            )}
          </div>
          <div className="mt-4">
            <Btn to={plano ? '/assinatura/minha' : '/assinatura/planos'} variant="secondary">
              {plano ? 'Ver assinatura' : 'Ver planos'}
            </Btn>
          </div>
        </Card>

        <Card tom="lemon" className="flex flex-col">
          <h2 className="text-xl">Último pedido</h2>
          <div className="mt-3 flex-1">
            {ultimo ? (
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Pedido #{ultimo.numero}</span>
                <Badge>{ultimo.status}</Badge>
                <span className="text-ink-soft">{brl(ultimo.total)}</span>
              </p>
            ) : (
              <Vazio texto="Você ainda não fez pedidos." />
            )}
          </div>
          <div className="mt-4">
            <Btn to={ultimo ? '/pedidos' : '/loja'} variant="secondary">
              {ultimo ? 'Ver meus pedidos' : 'Ver catálogo'}
            </Btn>
          </div>
        </Card>

        <Card tom="peach" className="flex flex-col">
          <h2 className="text-xl">Acompanhamento{criancaAtiva ? ` de ${criancaAtiva.nome}` : ''}</h2>
          <div className="mt-3 flex-1">
            {recentes.length ? (
              <ul className="space-y-1">
                {recentes.map((a) => (
                  <li key={a.id}>
                    <span className="text-ink-soft">{dataBR(a.data)}</span> · {a.atividade}
                  </li>
                ))}
              </ul>
            ) : (
              <Vazio texto="Nenhuma atividade registrada ainda." />
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn to="/acompanhamento" variant="secondary">
              Ver acompanhamento
            </Btn>
            <Btn to="/atividades/registrar" variant="ghost">
              Registrar
            </Btn>
          </div>
        </Card>
      </div>

      {sugerida && criancaAtiva ? (
        <div className="mt-6 rounded-card border-2 border-line bg-surface p-5">
          <p className="text-sm font-semibold text-violet">Sugestão para {criancaAtiva.nome}</p>
          <p className="font-display text-xl font-bold">{sugerida.nome}</p>
          <p className="text-ink-soft">{sugerida.descricao}</p>
          <div className="mt-3">
            <Btn to={`/loja/box/${sugerida.id}`} variant="secondary">
              Ver box
            </Btn>
          </div>
        </div>
      ) : null}

      <nav aria-label="Atalhos" className="mt-8">
        <h2 className="mb-3 text-lg">Atalhos</h2>
        <div className="flex flex-wrap gap-3">
          <Btn to="/loja" variant="ghost">
            Loja
          </Btn>
          <Btn to="/promocoes" variant="ghost">
            Promoções
          </Btn>
          <Btn to="/tutoriais" variant="ghost">
            Vídeos e tutoriais
          </Btn>
          <Btn to="/atividades/registrar" variant="ghost">
            Registrar atividade
          </Btn>
          <Btn to="/suporte" variant="ghost">
            Suporte
          </Btn>
        </div>
      </nav>
      <p className="mt-6 text-sm text-ink-soft">
        <Link to="/suporte" className="underline">
          Precisa de ajuda? Fale com o suporte.
        </Link>
      </p>
    </div>
  )
}

import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Preco } from '../components/Preco'
import { Badge, Card, Titulo } from '../components/ui'
import { boxesDoNivel } from '../data/boxes'
import { buscarPlano } from '../data/exemplos'
import { promocaoDaSemana } from '../data/promocoes'
import { buscarBox } from '../data/boxes'
import { brl, dataBR } from '../lib/format'
import { nivelDaCrianca, useStore } from '../store'

function Vazio({ texto }: { texto: string }) {
  return <p className="rounded-[24px] bg-white/70 p-3 text-ink-soft">{texto}</p>
}

const rotulo = (t: string, cor: string) => <p className={`font-hand text-2xl ${cor}`}>{t}</p>

export default function Inicio() {
  const { usuario, criancas, criancaAtiva, assinatura, pedidos, atividades } = useStore()
  const plano = buscarPlano(assinatura?.planoId)
  const ultimo = pedidos[0]
  const recentes = atividades.filter((a) => a.criancaId === criancaAtiva?.id).slice(0, 3)
  const nivel = nivelDaCrianca(criancaAtiva)
  const sugerida = boxesDoNivel(nivel)[0]
  const semana = promocaoDaSemana()
  const boxSemana = buscarBox(semana.boxId)!
  const nome = usuario?.nome.split(' ')[0]

  return (
    <div>
      <Titulo
        acao={
          <Btn to="/atividades/registrar" variant="accent">
            Registrar atividade
          </Btn>
        }
      >
        Olá, <em>{nome}</em>
      </Titulo>

      {/* Promoção da semana: um motivo para voltar */}
      <Link
        to="/promocoes"
        className="brilho group mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[40px_40px_40px_12px] bg-coral p-6 text-ink"
      >
        <div>
          <p className="font-hand text-2xl text-violet">promoção da semana</p>
          <p className="font-display text-xl font-bold md:text-2xl">
            {semana.titulo}: {boxSemana.nome} com {semana.desconto}% de desconto
          </p>
        </div>
        <span className="flex items-center gap-3 rounded-full bg-white px-5 py-2">
          <Preco box={boxSemana} />
          <span className="font-extrabold underline group-hover:no-underline">Ver</span>
        </span>
      </Link>

      <div className="grid items-start gap-6 md:grid-cols-2">
        <Card tom="violet" className="flex flex-col md:min-h-[220px]">
          {rotulo('criança ativa', 'text-sun')}
          <h2 className="text-3xl">{criancas.length > 1 ? 'Minhas crianças' : 'Minha criança'}</h2>
          <div className="mt-4 flex-1">
            {criancaAtiva ? (
              <>
                <p className="flex items-center gap-4">
                  <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-sun font-display text-3xl font-bold text-ink">
                    {criancaAtiva.nome.charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold">{criancaAtiva.nome}</span>
                    <span>{criancaAtiva.idade} anos</span>
                  </span>
                </p>
                {criancas.length > 1 ? (
                  <p className="mt-2 text-sm">
                    Também: {criancas.filter((c) => c.id !== criancaAtiva.id).map((c) => c.nome).join(', ')}
                  </p>
                ) : null}
              </>
            ) : (
              <Vazio texto="Nenhuma criança cadastrada." />
            )}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn to="/criancas" variant="accent" className="min-h-11 px-5 text-sm">
              {criancaAtiva ? 'Gerenciar crianças' : 'Cadastrar criança'}
            </Btn>
            {criancaAtiva ? (
              <Btn to="/criancas/nova" variant="light" className="min-h-11 px-5 text-sm">
                Adicionar
              </Btn>
            ) : null}
          </div>
        </Card>

        <Card tom="teal" className="flex flex-col md:mt-8">
          {rotulo('plano atual', 'text-violet')}
          <h2 className="text-3xl">Minha assinatura</h2>
          <div className="mt-4 flex-1">
            {plano && assinatura ? (
              <p className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-extrabold">Plano {plano.nome}</span>
                <Badge tom="sucesso">Ativa</Badge>
              </p>
            ) : (
              <Vazio texto="Você não tem assinatura ativa." />
            )}
          </div>
          <div className="mt-5">
            <Btn to={plano ? '/assinatura/minha' : '/assinatura/planos'} variant="ink" className="min-h-11 px-5 text-sm">
              {plano ? 'Ver assinatura' : 'Ver planos'}
            </Btn>
          </div>
        </Card>

        <Card tom="sun" className="flex flex-col">
          {rotulo('último pedido', 'text-violet')}
          <h2 className="text-3xl">{ultimo ? `Pedido #${ultimo.numero}` : 'Pedidos'}</h2>
          <div className="mt-4 flex-1">
            {ultimo ? (
              <p className="flex flex-wrap items-center gap-3">
                <Badge>{ultimo.status}</Badge>
                <span className="font-bold">{brl(ultimo.total)}</span>
              </p>
            ) : (
              <Vazio texto="Você ainda não fez pedidos." />
            )}
          </div>
          <div className="mt-5">
            <Btn to={ultimo ? '/pedidos' : '/loja'} variant="ink" className="min-h-11 px-5 text-sm">
              {ultimo ? 'Ver meus pedidos' : 'Ver catálogo'}
            </Btn>
          </div>
        </Card>

        <Card tom="coral" className="flex flex-col md:mt-8">
          {rotulo('caderno', 'text-violet')}
          <h2 className="text-3xl">Atividades recentes</h2>
          <div className="mt-4 flex-1">
            {recentes.length ? (
              <ul className="space-y-1">
                {recentes.map((a) => (
                  <li key={a.id}>
                    {dataBR(a.data)} · <span className="font-bold">{a.atividade}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Vazio texto="Nenhuma atividade registrada ainda." />
            )}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn to="/acompanhamento" variant="ink" className="min-h-11 px-5 text-sm">
              Ver acompanhamento
            </Btn>
            <Btn to="/atividades/registrar" variant="ghost" className="min-h-11 px-5 text-sm">
              Registrar
            </Btn>
          </div>
        </Card>
      </div>

      {sugerida && criancaAtiva ? (
        <div className="mt-8 rounded-[40px_40px_40px_12px] bg-lilac p-6">
          <p className="font-hand text-2xl text-violet">sugestão para {criancaAtiva.nome}</p>
          <p className="font-display text-2xl font-bold">{sugerida.nome}</p>
          <p className="text-ink-soft">{sugerida.descricao}</p>
          <div className="mt-4">
            <Btn to={`/loja/box/${sugerida.id}`} variant="primary" className="min-h-11 px-5 text-sm">
              Ver box
            </Btn>
          </div>
        </div>
      ) : null}

      <nav aria-label="Atalhos" className="mt-10">
        <h2 className="mb-3 text-lg font-extrabold">Atalhos</h2>
        <div className="flex flex-wrap gap-3">
          {[
            ['/loja', 'Loja'],
            ['/promocoes', 'Promoções'],
            ['/tutoriais', 'Vídeos e tutoriais'],
            ['/suporte', 'Suporte'],
          ].map(([to, t]) => (
            <Link
              key={to}
              to={to}
              className="inline-flex min-h-[46px] items-center rounded-full border-2 border-[#E4DED3] bg-white px-6 font-extrabold hover:bg-lilac"
            >
              {t}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

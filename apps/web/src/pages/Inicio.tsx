import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { Badge, Card } from '../components/ui'
import { buscarPlano } from '../data/exemplos'
import { brl, dataBR } from '../lib/format'
import { useStore } from '../store'

function Vazio({ texto }: { texto: string }) {
  return <p className="rounded-card border-2 border-dashed border-violet/40 bg-surface/60 p-3 text-ink-soft">{texto}</p>
}

export default function Inicio() {
  const { usuario, crianca, assinatura, pedidos, atividades } = useStore()
  const plano = buscarPlano(assinatura?.planoId)
  const ultimo = pedidos[0]
  const recentes = atividades.slice(0, 3)

  return (
    <div>
      <h1 className="mb-6 text-3xl md:text-5xl">Olá, {usuario?.nome.split(' ')[0]}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card tom="lilac" className="flex flex-col">
          <h2 className="text-xl">Minha criança</h2>
          <div className="mt-3 flex-1">
            {crianca ? (
              <p>
                <span className="font-semibold">{crianca.nome}</span>, {crianca.idade} anos
              </p>
            ) : (
              <Vazio texto="Nenhuma criança cadastrada." />
            )}
          </div>
          <div className="mt-4">
            <Btn to={crianca ? '/crianca/perfil' : '/crianca/cadastro'} variant="secondary">
              {crianca ? 'Ver perfil' : 'Cadastrar criança'}
            </Btn>
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
                <span className="text-muted">{brl(ultimo.total)}</span>
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
          <h2 className="text-xl">Atividades recentes</h2>
          <div className="mt-3 flex-1">
            {recentes.length ? (
              <ul className="space-y-1">
                {recentes.map((a) => (
                  <li key={a.id}>
                    <span className="text-muted">{dataBR(a.data)}</span> · {a.atividade}
                  </li>
                ))}
              </ul>
            ) : (
              <Vazio texto="Você ainda não registrou atividades." />
            )}
          </div>
          <div className="mt-4">
            <Btn to={recentes.length ? '/atividades/historico' : '/atividades/registrar'} variant="secondary">
              {recentes.length ? 'Ver histórico' : 'Registrar atividade'}
            </Btn>
          </div>
        </Card>
      </div>

      <nav aria-label="Atalhos" className="mt-8">
        <h2 className="mb-3 text-lg">Atalhos</h2>
        <div className="flex flex-wrap gap-3">
          <Btn to="/loja" variant="ghost">
            Loja
          </Btn>
          <Btn to="/atividades/registrar" variant="ghost">
            Registrar atividade
          </Btn>
          <Btn to="/suporte" variant="ghost">
            Suporte
          </Btn>
        </div>
      </nav>
      <p className="mt-6 text-sm text-muted">
        <Link to="/suporte" className="underline">
          Precisa de ajuda? Fale com o suporte.
        </Link>
      </p>
    </div>
  )
}


import { Link } from 'react-router'
import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Preco } from '../components/Preco'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Alert, Card, Titulo } from '../components/ui'
import { buscarBox } from '../data/boxes'
import {
  combo,
  promocaoDaSemana,
  promocoesDoMes,
  proximaPromocao,
  proximaSegunda,
  validadeDaSemana,
} from '../data/promocoes'
import { voarParaCarrinho } from '../lib/voar'
import { useStore } from '../store'

const dm = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

export default function Promocoes() {
  const { adicionarAoCarrinho } = useStore()
  const semana = promocaoDaSemana()
  const boxSemana = buscarBox(semana.boxId)!
  const proxima = proximaPromocao()
  const boxProxima = buscarBox(proxima.boxId)!

  return (
    <div>
      <Titulo apoio="Uma promoção nova toda segunda-feira, além das ofertas do mês. Volte sempre.">Promoções</Titulo>

      {/* Promoção da semana */}
      <section
        aria-labelledby="semana"
        className="relative mb-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-coral via-sun to-coral bg-[length:220%_220%] animate-gradiente p-6 text-ink md:p-10"
      >
        <div className="grid items-center gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="inline-block rounded-full bg-ink px-3 py-1 text-sm font-semibold uppercase tracking-widest text-white">
              Promoção da semana
            </p>
            <h2 id="semana" className="mt-3 text-3xl md:text-5xl">
              {semana.titulo}
            </h2>
            <p className="mt-2 text-lg">{semana.descricao}</p>
            <p className="mt-4 font-display text-xl font-bold">
              {boxSemana.nome}: {semana.desconto}% de desconto
            </p>
            <div className="mt-3 rounded-card bg-white/80 p-3">
              <Preco box={boxSemana} grande />
            </div>
            <p className="mt-3 text-sm font-medium">
              Válida até domingo, {dm(validadeDaSemana())}. Muda toda segunda-feira.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Btn
                variant="primary"
                onClick={(e) => {
                  voarParaCarrinho(e.currentTarget)
                  adicionarAoCarrinho(boxSemana.id)
                }}
              >
                Adicionar ao carrinho
              </Btn>
              <Btn to={`/loja/box/${boxSemana.id}`} variant="light" className="bg-white">
                Ver a box
              </Btn>
            </div>
          </div>
          <div className="md:col-span-2">
            <TiltCard>
              <CapaBox box={boxSemana} className="h-44 md:h-60" />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Próxima segunda */}
      <Alert variant="info">
        <p className="font-semibold">Na segunda-feira, {dm(proximaSegunda())}</p>
        <p>
          Entra a <b>{proxima.titulo}</b>: {boxProxima.nome} com {proxima.desconto}% de desconto. Volte para aproveitar.
        </p>
      </Alert>

      {/* Ofertas do mês */}
      <section className="mt-12" aria-labelledby="mes">
        <h2 id="mes" className="text-2xl md:text-3xl">
          Ofertas do mês
        </h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {promocoesDoMes.map((p, i) => {
            const box = buscarBox(p.boxId)!
            return (
              <li key={p.id}>
                <Reveal atraso={i * 70} className="h-full">
                  <Card as="div" className="flex h-full flex-col gap-3 p-4">
                    <CapaBox box={box} className="h-36" />
                    <p className="text-sm font-semibold text-violet">{p.titulo}</p>
                    <h3 className="text-xl">{box.nome}</h3>
                    <p className="text-ink-soft">{p.descricao}</p>
                    <Preco box={box} />
                    <div className="mt-auto flex flex-wrap gap-2">
                      <Btn to={`/loja/box/${box.id}`} variant="secondary">
                        Ver detalhes
                      </Btn>
                      <Btn
                        onClick={(e) => {
                          voarParaCarrinho(e.currentTarget)
                          adicionarAoCarrinho(box.id)
                        }}
                      >
                        Adicionar ao carrinho
                      </Btn>
                    </div>
                  </Card>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Combo e assinatura */}
      <section className="mt-12 grid gap-5 md:grid-cols-2" aria-label="Outras ofertas">
        <Card tom="lemon">
          <h2 className="text-2xl">Combo de boxes</h2>
          <p className="mt-2">
            Leve {combo.minimo} ou mais boxes e ganhe <b>{combo.desconto}% de desconto</b> no total. O desconto aparece sozinho no carrinho.
          </p>
          <div className="mt-4">
            <Btn to="/loja" variant="secondary">
              Montar meu combo
            </Btn>
          </div>
        </Card>
        <Card tom="aqua">
          <h2 className="text-2xl">Assine e economize</h2>
          <p className="mt-2">Os planos de 3 e 6 meses saem mais baratos por box do que o plano mensal.</p>
          <div className="mt-4">
            <Btn to="/assinatura/planos" variant="secondary">
              Ver planos
            </Btn>
          </div>
        </Card>
      </section>

      <p className="mt-8 text-sm text-ink-soft">
        Descontos, regras e datas são exemplos, ainda em definição pela equipe. <Link to="/suporte" className="underline">Dúvidas? Fale com o suporte.</Link>
      </p>
    </div>
  )
}

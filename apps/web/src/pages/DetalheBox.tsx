import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Preco } from '../components/Preco'
import { IconPlay } from '../components/VideoTutorial'
import { Alert, Badge, Card, EmptyState, Titulo } from '../components/ui'
import { buscarBox, rotuloNiveis } from '../data/boxes'
import { promocaoDaBox } from '../data/promocoes'
import { tutorialDoBrinquedo } from '../data/tutoriais'
import { voarParaCarrinho } from '../lib/voar'
import { useStore } from '../store'

export default function DetalheBox() {
  const { id } = useParams()
  const box = buscarBox(id)
  const { adicionarAoCarrinho } = useStore()
  const nav = useNavigate()
  const [adicionada, setAdicionada] = useState(false)

  if (!box) {
    return (
      <div>
        <Titulo cor="violet" olho="nada por aqui">Box não encontrada</Titulo>
        <EmptyState titulo="Box não encontrada." acao="Ver catálogo" to="/loja" />
      </div>
    )
  }

  const promo = promocaoDaBox(box.id)

  return (
    <div>
      <Titulo
        olho="← voltar ao catálogo"
        acao={
          <Btn to="/loja" variant="ink">
            ← Voltar ao catálogo
          </Btn>
        }
      >
        {box.nome}
      </Titulo>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <CapaBox box={box} className="mb-6 h-40 md:h-64" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{rotuloNiveis(box.niveis)}</Badge>
            <Badge>{box.foco}</Badge>
            {promo ? <Badge tom="atencao">Promoção: {promo.desconto}% de desconto</Badge> : null}
          </div>
          <p className="mt-4 font-display text-3xl font-bold md:text-[46px] md:leading-[1.08]">{box.descricao}</p>

          <h2 className="mt-10 text-3xl md:text-[32px]">
            Brinquedos desta <em className="text-violet">box</em>
          </h2>
          <ul className="mt-3 space-y-3">
            {box.brinquedos.map((b) => {
              const tutorial = tutorialDoBrinquedo(b.nome)
              return (
                <Card as="li" key={b.nome} className="!rounded-[32px_32px_32px_10px] !p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-base font-extrabold">{b.nome}</h3>
                      <p className="mt-1">
                        <span className="font-medium">O que estimula: </span>
                        {b.estimulo}
                      </p>
                    </div>
                    {tutorial ? (
                      <Link
                        to={`/tutoriais/${tutorial.id}`}
                        className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-violet px-5 font-extrabold text-violet transition hover:-translate-y-0.5 hover:bg-lilac"
                      >
                        <IconPlay className="h-5 w-5" /> Ver tutorial
                      </Link>
                    ) : null}
                  </div>
                </Card>
              )
            })}
          </ul>

          <h2 className="mt-10 text-3xl md:text-[32px]">Dicas de uso</h2>
          <ol className="mt-3 space-y-2">
            {box.dicas.map((d, i) => (
              <li key={d} className="flex gap-3 rounded-[28px] bg-lemon px-5 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet text-sm font-bold text-white">
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <Alert variant="info">Conteúdo informativo. Não substitui orientação de profissionais de saúde.</Alert>
          </div>
        </div>

        <aside className="md:col-span-1">
          <Card tom="violet" className="md:sticky md:top-28">
            <p className="font-hand text-2xl text-sun">preço da box</p>
            <Preco box={box} grande />
            <div className="mt-4 space-y-3">
              <Btn
                block
                variant="accent"
                onClick={(e) => {
                  adicionarAoCarrinho(box.id)
                  nav('/checkout/endereco')
                  e.stopPropagation()
                }}
              >
                Comprar agora
              </Btn>
              <Btn
                block
                variant="light"
                onClick={(e) => {
                  voarParaCarrinho(e.currentTarget)
                  adicionarAoCarrinho(box.id)
                  setAdicionada(true)
                }}
              >
                Adicionar ao carrinho
              </Btn>
              {adicionada ? (
                <Alert
                  variant="sucesso"
                  action={
                    <Link to="/carrinho" className="inline-flex min-h-12 items-center text-violet underline">
                      Ver carrinho
                    </Link>
                  }
                >
                  Box adicionada ao carrinho.
                </Alert>
              ) : null}
              <p className="text-sm text-white/90">Você só precisa entrar na hora de comprar.</p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

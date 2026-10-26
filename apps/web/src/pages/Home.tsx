import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Faixa, Onda, useDefinirBanda } from '../components/Banda'
import { IconCheck } from '../components/Icons'
import { Preco } from '../components/Preco'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { boxes } from '../data/boxes'
import { useParallax } from '../lib/useParallax'

// Cada peça se move com o mouse (variáveis --px e --py) com uma intensidade própria.
const mover = (k: number) => ({
  transform: `translate(calc(var(--px, 0) * ${k}px), calc(var(--py, 0) * ${k}px))`,
  transition: 'transform 0.25s ease-out',
})

const passos = [
  { t: 'Explore', d: 'Veja boxes, promoções e tutoriais sem criar conta.', cor: 'bg-violet text-white' },
  { t: 'Escolha', d: 'Compare por nível e veja o que cada brinquedo estimula.', cor: 'bg-coral text-ink' },
  { t: 'Compre ou assine', d: 'Entre ou crie a conta só na hora de comprar.', cor: 'bg-teal text-ink' },
  { t: 'Acompanhe', d: 'Cadastre a criança e anote o que foi feito.', cor: 'bg-ink text-white' },
]

// Caixa de brinquedos aberta: as peças saem de dentro e flutuam devagar.
function ArteHeroi() {
  return (
    <svg viewBox="0 0 540 500" className="w-full max-w-[540px] overflow-visible" aria-hidden="true">
      <path
        d="M270 10C432 0 534.6 140 523.8 270C513 410 388.8 495 248.4 485C97.2 475 5.4 370 16.2 230C27 100 129.6 15 270 10Z"
        className="fill-sun"
      />
      <path d="M100 300h360l-26 164a18 18 0 0 1-18 14H144a18 18 0 0 1-18-14z" className="fill-teal" />
      <path d="M100 300h360l-6 40H106z" fill="#0E8F83" />
      <rect x="236" y="346" width="88" height="28" rx="14" className="fill-white" />
      <path d="M100 300l-34-54 84 14zM460 300l34-54-84 14z" className="fill-teal" />
      <g style={mover(-20)}>
        <g className="animate-flutuar">
          <g transform="translate(140 140) rotate(-8) scale(1.55)">
            <rect x="6" y="56" width="42" height="40" rx="12" className="fill-teal" />
            <rect x="52" y="56" width="42" height="40" rx="12" className="fill-coral" />
            <rect x="28" y="14" width="44" height="42" rx="12" className="fill-violet" />
            <path d="M42 34h16M50 28v12" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" />
          </g>
        </g>
      </g>
      <g style={mover(30)}>
        <g className="animate-flutuar [animation-delay:-3s]">
          <g transform="translate(262 82) rotate(6) scale(1.4)">
            <circle cx="50" cy="52" r="40" className="fill-violet" />
            <circle cx="36" cy="38" r="5" fill="#fff" opacity=".55" />
            <circle cx="62" cy="34" r="4" fill="#fff" opacity=".55" />
            <circle cx="68" cy="58" r="5" fill="#fff" opacity=".55" />
          </g>
        </g>
      </g>
      <g style={mover(-34)}>
        <g className="animate-flutuar [animation-delay:-5s]">
          <g transform="translate(372 140) rotate(10) scale(1.45)">
            <path d="M50 6l12 27 29 3-22 20 7 29-26-15-26 15 7-29L9 36l29-3z" className="fill-sun" stroke="#E8B92A" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="42" cy="48" r="3" fill="#14142B" />
            <circle cx="58" cy="48" r="3" fill="#14142B" />
            <path d="M44 58q6 5 12 0" stroke="#14142B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default function Home() {
  useDefinirBanda('violet')
  const parallax = useParallax<HTMLElement>()
  return (
    <div className="-mt-8">
      {/* Herói: faixa violeta, círculos que saem da borda e caixa de peças */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <section
          ref={parallax.ref}
          onPointerMove={parallax.onPointerMove}
          onPointerLeave={parallax.onPointerLeave}
          className="relative overflow-hidden bg-violet text-white"
        >
          <span className="pointer-events-none absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full bg-[#5A3FF0]" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-28 -left-24 h-[300px] w-[300px] rounded-full bg-[#2E1BA8]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 pb-14 pt-[120px] md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-hand text-3xl text-sun">feito para brincar junto</p>
              <h1 className="mt-2 text-5xl md:text-[80px] md:leading-[1.02]">
                Brinquedos que ajudam a criança a <em className="text-sun">se conectar</em> com o mundo.
              </h1>
              <p className="mt-6 max-w-[520px] text-xl text-white/95">
                Boxes sensoriais escolhidas por nível de suporte, com passo a passo de uso e um caderno para registrar o
                que funcionou em casa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn to="/loja" variant="accent">
                  Ver as boxes
                </Btn>
                <Btn to="/tutoriais" variant="light">
                  Como funciona
                </Btn>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-bold">
                {['Olhe tudo sem criar conta', 'Conta só na hora de comprar'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <IconCheck width={18} height={18} className="text-sun" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <ArteHeroi />
            </div>
          </div>
          <div className="bg-violet">
            <Onda de="sun" />
          </div>
        </section>
      </div>

      {/* Como funciona */}
      <Faixa cor="sun" className="pb-14 pt-6" ondaPara="bg">
        <section aria-labelledby="como">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-hand text-3xl text-coral">do primeiro olhar ao caderno</p>
                <h2 id="como" className="text-4xl md:text-[56px]">
                  Como a ConecTEA <em className="text-violet">funciona</em>
                </h2>
              </div>
              <p className="max-w-[360px] text-lg">Cada passo acontece no seu ritmo. Nada é pedido antes da hora de comprar.</p>
            </div>
          </Reveal>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <li key={p.t}>
                <Reveal atraso={i * 60} className="h-full">
                  <span className={`flex h-[84px] w-[84px] items-center justify-center rounded-full font-display text-4xl font-bold ${p.cor}`}>
                    {i + 1}
                  </span>
                  <h3 className="mb-2 mt-5 text-[28px]">{p.t}</h3>
                  <p className="max-w-[250px]">{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      </Faixa>

      {/* Boxes */}
      <section aria-labelledby="boxes" className="py-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-hand text-3xl text-coral">uma box para cada fase</p>
              <h2 id="boxes" className="text-4xl md:text-[56px]">
                Nossas boxes, por <em className="text-violet">nível</em>
              </h2>
            </div>
            <Btn to="/loja" variant="ink">
              Ver as {boxes.length} boxes
            </Btn>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.slice(0, 3).map((b, i) => (
            <li key={b.id} className={i === 1 ? 'lg:mt-10' : ''}>
              <Reveal atraso={i * 60} className="h-full">
                <TiltCard className="h-full">
                  <article className="group h-full">
                    <div className="overflow-hidden rounded-[56px_56px_56px_16px]">
                      <CapaBox box={b} className="h-56 group-hover:scale-105" />
                    </div>
                    <h3 className="mt-5 text-[34px]">{b.nome}</h3>
                    <p className="mt-1 text-ink-soft">{b.descricao}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Preco box={b} />
                      <Btn to={`/loja/box/${b.id}`} variant="ink" className="min-h-11 px-5 text-sm">
                        Ver detalhes
                      </Btn>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Atividades */}
      <Faixa cor="teal" ondaDe="bg" ondaPara="bg" className="py-12">
        <section aria-labelledby="ativ">
          <Reveal>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="rounded-[56px_56px_56px_16px] bg-white p-10 text-center">
                <p className="font-display text-3xl font-bold text-violet">Caderno de atividades</p>
                <p className="mt-2 text-ink-soft">Data, o que foi feito e o que funcionou.</p>
              </div>
              <div>
                <p className="font-hand text-3xl text-sun">sem pressão</p>
                <h2 id="ativ" className="text-4xl text-white md:text-[54px]">
                  Anote o que <em className="text-sun">funcionou</em>, no seu ritmo
                </h2>
                <p className="mt-4 text-xl text-white">
                  Depois de cada brincadeira, registre em poucas palavras. Com o tempo, você enxerga o que a criança mais
                  gosta e escolhe a próxima box com mais segurança.
                </p>
                <ul className="mt-6 space-y-2 font-bold text-white">
                  {['Vários filhos na mesma conta', 'Dicas de uso para cada box', 'Vídeos curtos, passo a passo'].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <IconCheck width={16} height={16} className="text-teal" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      </Faixa>

      {/* Chamada final */}
      <div className="pb-6 pt-4">
        <Reveal>
          <section
            className="flex flex-wrap items-center justify-between gap-8 rounded-[64px_64px_64px_18px] bg-ink p-10 md:p-14"
            aria-labelledby="cta"
          >
            <div className="max-w-[640px]">
              <h2 id="cta" className="text-4xl text-white md:text-[52px]">
                Comece olhando as boxes. A conta só é pedida <em className="text-sun">na hora de comprar.</em>
              </h2>
              <p className="mt-4 text-lg text-white/90">Esta é uma versão de demonstração. Nenhum pagamento real é feito.</p>
            </div>
            <Btn to="/loja" variant="accent">
              Ver as boxes
            </Btn>
          </section>
        </Reveal>
      </div>
    </div>
  )
}

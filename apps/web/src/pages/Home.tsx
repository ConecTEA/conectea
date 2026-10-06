import { Btn } from '../components/Btn'
import { CapaBox } from '../components/CapaBox'
import { Reveal } from '../components/Reveal'
import { boxes } from '../data/boxes'
import { brl } from '../lib/format'

const passos = [
  { t: 'Cadastre', d: 'Crie sua conta e cadastre a criança.', cor: 'bg-lilac' },
  { t: 'Escolha', d: 'Veja as boxes e o que cada brinquedo estimula.', cor: 'bg-lemon' },
  { t: 'Assine ou compre', d: 'Escolha um plano ou compre uma box.', cor: 'bg-aqua' },
  { t: 'Registre', d: 'Anote as atividades feitas com a criança.', cor: 'bg-peach' },
]

// Peças do herói: encaixam ao carregar e depois flutuam devagar.
function PecasHeroi() {
  return (
    <svg viewBox="0 0 360 320" className="w-full max-w-[420px]" aria-hidden="true">
      <g className="animate-flutuar">
        <circle cx="120" cy="120" r="84" className="fill-sun" />
      </g>
      <g className="animate-flutuar [animation-delay:-3s]">
        <rect x="170" y="110" width="140" height="140" rx="26" className="fill-coral" />
      </g>
      <g className="animate-flutuar [animation-delay:-5s]">
        <path d="M40 290a80 80 0 0 1 160 0z" className="fill-teal" />
      </g>
      <circle cx="262" cy="64" r="22" className="fill-white" />
      <circle cx="120" cy="120" r="26" className="fill-violet-deep" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Herói */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-violet to-violet-deep px-6 py-12 text-white md:px-14 md:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 animate-girar rounded-full border-[28px] border-white/10" aria-hidden="true" />
        <div className="relative grid items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="font-semibold uppercase tracking-widest text-sun">Onde cada experiência transforma e conecta</p>
            <h1 className="mt-3 text-4xl md:text-6xl">Boxes sensoriais para conectar famílias.</h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              Assine boxes de brinquedos sensoriais para crianças com TEA e registre as atividades feitas em casa, tudo
              em um só lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/cadastro" variant="accent">
                Criar conta
              </Btn>
              <Btn to="/login" variant="light">
                Entrar
              </Btn>
            </div>
          </div>
          <div className="flex justify-center md:col-span-2">
            <PecasHeroi />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="como">
        <Reveal>
          <h2 id="como" className="text-3xl md:text-4xl">
            Como funciona
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p, i) => (
            <li key={p.t}>
              <Reveal atraso={i * 60} className="h-full">
                <div className={`h-full rounded-card p-6 ${p.cor}`}>
                  <span className="font-display text-5xl font-bold text-violet">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-xl">{p.t}</h3>
                  <p className="mt-1 text-ink-soft">{p.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Boxes */}
      <section aria-labelledby="boxes">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="boxes" className="text-3xl md:text-4xl">
                Nossas boxes
              </h2>
              <p className="mt-2 text-ink-soft">Quatro boxes de exemplo, cada uma com uma cor e um foco.</p>
            </div>
            <Btn to="/login" variant="secondary">
              Ver catálogo
            </Btn>
          </div>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {boxes.map((b, i) => (
            <li key={b.id}>
              <Reveal atraso={i * 60} className="h-full">
                <article className="group h-full rounded-card border-2 border-line bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="overflow-hidden rounded-card">
                    <CapaBox box={b} className="h-32 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 text-xl">{b.nome}</h3>
                  <p className="mt-1 text-ink-soft">{b.descricao}</p>
                  <p className="mt-3 font-display text-2xl font-bold tabular-nums">{brl(b.preco)}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Atividades */}
      <section aria-labelledby="ativ">
        <Reveal>
          <div className="grid items-center gap-6 rounded-[28px] bg-ink p-8 text-white md:grid-cols-2 md:p-14">
            <div>
              <h2 id="ativ" className="text-3xl md:text-4xl">
                Acompanhe cada atividade.
              </h2>
              <p className="mt-4 max-w-md text-white/85">
                Depois de cada brincadeira, anote o que foi feito. Você guarda tudo em um só lugar e consulta quando quiser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <span className="rounded-full bg-sun px-5 py-3 font-display text-lg font-bold text-ink">4 boxes</span>
              <span className="rounded-full bg-teal px-5 py-3 font-display text-lg font-bold text-ink">Histórico</span>
              <span className="rounded-full bg-coral px-5 py-3 font-display text-lg font-bold text-ink">Suporte</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Chamada final */}
      <Reveal>
        <section className="rounded-[28px] bg-sun px-6 py-12 text-center text-ink md:py-16" aria-labelledby="cta">
          <h2 id="cta" className="text-3xl md:text-5xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-3 max-w-lg">Crie sua conta em menos de um minuto. Esta é uma versão de demonstração.</p>
          <div className="mt-6 flex justify-center">
            <Btn to="/cadastro">Criar conta</Btn>
          </div>
        </section>
      </Reveal>
    </div>
  )
}

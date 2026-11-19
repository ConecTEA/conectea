import { useNavigate, Link } from 'react-router'
import { Btn } from '../components/Btn'
import { IconCheck } from '../components/Icons'
import { Alert, Card, Titulo } from '../components/ui'
import { planos } from '../data/exemplos'
import { brl } from '../lib/format'
import { useStore } from '../store'

export default function Planos() {
  const { escolherPlano } = useStore()
  const nav = useNavigate()

  return (
    <div>
      <Titulo apoio="Você escolhe um plano e recebe uma box por mês. Antes de cada envio, você escolhe qual box quer receber.">
        Planos de assinatura
      </Titulo>
      <div className="mb-6">
        <Alert variant="info">Nomes e valores dos planos são exemplos, ainda em definição pela equipe.</Alert>
      </div>

      <ul className="grid items-start gap-7 md:grid-cols-3">
        {planos.map((p, i) => (
          <Card
            as="li"
            key={p.id}
            tom={(['sun', 'violet', 'coral'] as const)[i % 3]}
            className={`relative flex flex-col min-w-0 !rounded-[64px_64px_64px_18px] !p-6 lg:!p-9 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${i === 1 ? 'md:-mt-3' : ''}`}
          >
            {i === 1 ? (
              <span className="absolute -top-4 left-6 rounded-full sm:left-9 bg-sun px-4 py-1.5 text-sm font-extrabold text-ink">
                Mais econômico por box
              </span>
            ) : null}
            <h2 className="text-4xl">{p.nome}</h2>
            <p className="mt-3">
              <span className="font-display text-4xl font-bold tabular-nums lg:text-5xl">{brl(p.preco)}</span>
              <span className="mt-1 block">{p.periodicidade}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2">
              {p.inclui.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <IconCheck className="mt-1 shrink-0" width={18} height={18} />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm">{p.cobranca}</p>
            <div className="mt-5">
              <Btn
                block
                variant={i === 1 ? 'accent' : 'ink'}
                onClick={() => {
                  escolherPlano(p.id)
                  nav('/checkout/endereco')
                }}
              >
                Assinar este plano
              </Btn>
            </div>
          </Card>
        ))}
      </ul>

      <section className="mt-10" aria-labelledby="comparar">
        <h2 id="comparar" className="mb-4 text-4xl">
          Compare os <em className="text-violet">planos</em>
        </h2>
        <div className="overflow-x-auto rounded-[40px] border-2 border-[#E9E3F8] bg-surface">
          <table className="w-full min-w-[520px] text-left">
            <caption className="sr-only">Comparação entre os planos de assinatura</caption>
            <thead className="bg-lilac">
              <tr className="border-b border-border">
                <th scope="col" className="p-3">Plano</th>
                <th scope="col" className="p-3">Valor</th>
                <th scope="col" className="p-3">Cobrança</th>
                <th scope="col" className="p-3">Boxes</th>
              </tr>
            </thead>
            <tbody>
              {planos.map((p, i) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <th scope="row" className="p-3 font-medium">{p.nome}</th>
                  <td className="p-3">{brl(p.preco)}</td>
                  <td className="p-3">{p.periodicidade}</td>
                  <td className="p-3">{[1, 3, 6][i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6">
        <Link to="/suporte" className="inline-flex min-h-12 items-center font-extrabold text-violet underline">
          Dúvidas? Fale com o suporte.
        </Link>
      </p>
    </div>
  )
}

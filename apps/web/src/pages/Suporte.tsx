import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Btn } from '../components/Btn'
import { Field } from '../components/Field'
import { IconChevron } from '../components/Icons'
import { Alert, Card, Titulo } from '../components/ui'
import { faq } from '../data/exemplos'
import { emailValido, msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'

const assuntos = ['Produtos', 'Assinatura', 'Pedido', 'Outro']

export default function Suporte() {
  const { usuario } = useStore()
  const [nome, setNome] = useState(usuario?.nome ?? '')
  const [email, setEmail] = useState(usuario?.email ?? '')
  const [assunto, setAssunto] = useState(assuntos[0])
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState(false)
  const [aberta, setAberta] = useState<number | null>(null)

  function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(nome)) n.nome = msg.obrigatorio
    if (vazio(email)) n.email = msg.obrigatorio
    else if (!emailValido(email)) n.email = msg.email
    if (vazio(mensagem)) n.mensagem = msg.obrigatorio
    setErros(n)
    if (temErro(n)) return
    setEnviado(true)
    setMensagem('')
  }

  return (
    <div>
      <Titulo apoio="Tire dúvidas sobre produtos, assinatura e pedidos.">Contato e suporte</Titulo>

      <div className="grid gap-8 md:grid-cols-2">
        <section aria-labelledby="faq" className="md:order-1">
          <h2 id="faq" className="mb-3 text-xl">
            Perguntas frequentes
          </h2>
          <ul className="space-y-2">
            {faq.map((f, i) => {
              const ab = aberta === i
              return (
                <li key={f.p} className="rounded-card border border-border bg-surface">
                  <h3 className="text-base">
                    <button
                      type="button"
                      onClick={() => setAberta(ab ? null : i)}
                      aria-expanded={ab}
                      aria-controls={`faq-${i}`}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-card px-4 py-2 text-left font-medium"
                    >
                      {f.p}
                      <span className="flex shrink-0 items-center gap-1 text-sm text-muted">
                        {ab ? 'Fechar' : 'Abrir'}
                        <IconChevron className={ab ? 'rotate-180' : ''} />
                      </span>
                    </button>
                  </h3>
                  {ab ? (
                    <p id={`faq-${i}`} className="px-4 pb-4">
                      {f.r}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="contato" className="md:order-2">
          <h2 id="contato" className="mb-3 text-xl">
            Envie uma mensagem
          </h2>
          {enviado ? (
            <div className="mb-4">
              <Alert variant="sucesso">Mensagem enviada. Responderemos em breve.</Alert>
            </div>
          ) : null}
          <Card>
            <form onSubmit={enviar} noValidate className="space-y-4">
              <Field label="Nome" id="nome" autoComplete="name" required value={nome} onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} error={erros.nome} />
              <Field label="E-mail" id="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} error={erros.email} />
              <Field label="Assunto" id="assunto" as="select" options={assuntos} required value={assunto} onChange={(e: ChangeEvent<HTMLSelectElement>) => setAssunto(e.target.value)} />
              <Field
                label="Mensagem"
                id="mensagem"
                as="textarea"
                required
                maxLength={1000}
                value={mensagem}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMensagem(e.target.value)}
                counter={{ atual: mensagem.length, max: 1000 }}
                error={erros.mensagem}
              />
              <Btn type="submit" block>
                Enviar mensagem
              </Btn>
            </form>
          </Card>
        </section>
      </div>
    </div>
  )
}

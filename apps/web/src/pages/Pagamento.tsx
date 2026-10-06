import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field } from '../components/Field'
import { ResumoPedido } from '../components/ResumoPedido'
import { Alert, Card, EmptyState, Stepper, Titulo } from '../components/ui'
import { formasPagamento } from '../data/exemplos'
import { msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'
import { passosCompra } from './Endereco'

export default function Pagamento() {
  const { itensCheckout, endereco, finalizarPedido } = useStore()
  const nav = useNavigate()
  const [forma, setForma] = useState(formasPagamento[0].id)
  const [c, setC] = useState({ numero: '', nome: '', validade: '', cvv: '' })
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)

  if (itensCheckout().length === 0 || !endereco) {
    return (
      <div>
        <Titulo>Pagamento</Titulo>
        <EmptyState
          titulo={itensCheckout().length === 0 ? 'Seu carrinho está vazio.' : 'Falta informar o endereço.'}
          acao={itensCheckout().length === 0 ? 'Ver catálogo' : 'Informar endereço'}
          to={itensCheckout().length === 0 ? '/loja' : '/checkout/endereco'}
        />
      </div>
    )
  }

  const set = (k: keyof typeof c) => (e: ChangeEvent<HTMLInputElement>) => setC((x) => ({ ...x, [k]: e.target.value }))
  const atual = formasPagamento.find((f) => f.id === forma)!

  function confirmar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (forma === 'cartao') {
      if (vazio(c.numero)) n.numero = msg.obrigatorio
      else if (!/^\d{13,19}$/.test(c.numero.replace(/\s/g, ''))) n.numero = 'Informe de 13 a 19 números.'
      if (vazio(c.nome)) n.nome = msg.obrigatorio
      if (vazio(c.validade)) n.validade = msg.obrigatorio
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(c.validade)) n.validade = 'Use o formato MM/AA.'
      if (vazio(c.cvv)) n.cvv = msg.obrigatorio
      else if (!/^\d{3,4}$/.test(c.cvv)) n.cvv = 'Informe 3 ou 4 números.'
    }
    setErros(n)
    if (temErro(n)) return
    setEnviando(true)
    setTimeout(() => {
      finalizarPedido(atual.nome)
      nav('/checkout/confirmacao')
    }, 500)
  }

  return (
    <div>
      <Stepper atual={2} passos={passosCompra} />
      <Titulo>Pagamento</Titulo>
      <div className="mb-6">
        <Alert variant="alerta">
          <strong>Ambiente de testes.</strong> Nenhuma cobrança real será feita. Não digite dados reais.
        </Alert>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <form onSubmit={confirmar} noValidate className="space-y-6 md:col-span-2">
          <fieldset>
            <legend className="mb-2 text-lg font-semibold">Forma de pagamento</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {formasPagamento.map((f) => (
                <label
                  key={f.id}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-card border bg-surface p-4 ${
                    forma === f.id ? 'border-primary-dark border-2 font-semibold' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="forma"
                    value={f.id}
                    checked={forma === f.id}
                    onChange={() => setForma(f.id)}
                    className="h-5 w-5 accent-primary-dark"
                  />
                  {f.nome}
                </label>
              ))}
            </div>
          </fieldset>

          <Card>
            <h2 className="mb-1 text-lg">{atual.nome}</h2>
            <p className="mb-4 text-muted">{atual.descricao}</p>
            {forma === 'cartao' ? (
              <div className="space-y-4">
                <Field label="Número do cartão de teste" id="numero" inputMode="numeric" autoComplete="off" required value={c.numero} onChange={set('numero')} error={erros.numero} />
                <Field label="Nome no cartão" id="nome" autoComplete="off" required value={c.nome} onChange={set('nome')} error={erros.nome} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Validade (MM/AA)" id="validade" autoComplete="off" required maxLength={5} value={c.validade} onChange={set('validade')} error={erros.validade} />
                  <Field label="CVV" id="cvv" inputMode="numeric" autoComplete="off" required maxLength={4} value={c.cvv} onChange={set('cvv')} error={erros.cvv} />
                </div>
              </div>
            ) : forma === 'pix' ? (
              <div className="space-y-3">
                <div className="flex h-40 w-40 items-center justify-center rounded-card border border-border bg-bg text-center text-sm text-muted">
                  QR code de teste
                </div>
                <p className="break-all rounded-card border border-border bg-bg p-3 font-mono text-sm">
                  00020126-TESTE-CONECTEA-0000-NAO-PAGUE
                </p>
              </div>
            ) : (
              <p className="break-all rounded-card border border-border bg-bg p-3 font-mono text-sm">
                00000.00000 00000.000000 00000.000000 0 00000000000000 (TESTE)
              </p>
            )}
          </Card>

          <div className="flex flex-col gap-3">
            <Btn type="submit" block disabled={enviando}>
              {enviando ? 'Confirmando...' : 'Confirmar pedido'}
            </Btn>
            <p className="text-center">
              <Link to="/checkout/endereco" className="inline-flex min-h-12 items-center text-primary-dark underline">
                Voltar
              </Link>
            </p>
          </div>
        </form>

        <aside>
          <ResumoPedido mostrarEndereco />
        </aside>
      </div>
    </div>
  )
}

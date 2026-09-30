import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field } from '../components/Field'
import { ResumoPedido } from '../components/ResumoPedido'
import { Card, EmptyState, Stepper, Titulo } from '../components/ui'
import { msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore, type Endereco as EnderecoT } from '../store'

export const passosCompra = ['Carrinho', 'Endereço', 'Pagamento', 'Confirmação']

const estados = ['SC', 'PR', 'RS', 'SP', 'RJ', 'MG', 'ES', 'GO', 'DF', 'BA', 'PE', 'CE', 'Outro']

const vazioEnd: EnderecoT = {
  destinatario: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: 'SC',
  telefone: '',
}

export default function Endereco() {
  const { endereco, salvarEndereco, itensCheckout } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState<EnderecoT>(endereco ?? vazioEnd)
  const [erros, setErros] = useState<Erros>({})

  if (itensCheckout().length === 0) {
    return (
      <div>
        <Titulo>Endereço de entrega</Titulo>
        <EmptyState titulo="Seu carrinho está vazio." acao="Ver catálogo" to="/loja" />
      </div>
    )
  }

  const set = (k: keyof EnderecoT) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value }))

  function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    const obrig: (keyof EnderecoT)[] = ['destinatario', 'rua', 'numero', 'bairro', 'cidade', 'telefone']
    obrig.forEach((k) => {
      if (vazio(f[k])) n[k] = msg.obrigatorio
    })
    if (vazio(f.cep)) n.cep = msg.obrigatorio
    else if (!/^\d{8}$/.test(f.cep.replace(/\D/g, '')) || /\D/.test(f.cep.replace('-', ''))) n.cep = msg.cep
    if (!n.telefone && f.telefone.replace(/\D/g, '').length < 10) n.telefone = 'Informe o telefone com DDD.'
    setErros(n)
    if (temErro(n)) return
    salvarEndereco(f)
    nav('/checkout/pagamento')
  }

  return (
    <div>
      <Stepper atual={1} passos={passosCompra} />
      <Titulo>Endereço de entrega</Titulo>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <form onSubmit={enviar} noValidate className="space-y-4">
              <Field label="Nome do destinatário" id="destinatario" autoComplete="name" required value={f.destinatario} onChange={set('destinatario')} error={erros.destinatario} />
              <div className="max-w-[200px]">
                <Field label="CEP" id="cep" inputMode="numeric" autoComplete="postal-code" required maxLength={9} value={f.cep} onChange={set('cep')} error={erros.cep} help="8 números." />
              </div>
              <Field label="Rua" id="rua" autoComplete="address-line1" required value={f.rua} onChange={set('rua')} error={erros.rua} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Número" id="numero" required value={f.numero} onChange={set('numero')} error={erros.numero} />
                <Field label="Complemento" id="complemento" value={f.complemento} onChange={set('complemento')} />
              </div>
              <Field label="Bairro" id="bairro" required value={f.bairro} onChange={set('bairro')} error={erros.bairro} />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <Field label="Cidade" id="cidade" autoComplete="address-level2" required value={f.cidade} onChange={set('cidade')} error={erros.cidade} />
                </div>
                <Field label="Estado" id="estado" as="select" options={estados} required value={f.estado} onChange={set('estado')} />
              </div>
              <Field label="Telefone" id="telefone" type="tel" inputMode="tel" autoComplete="tel" required value={f.telefone} onChange={set('telefone')} error={erros.telefone} help="Com DDD." />
              <div className="flex flex-col gap-3 pt-2">
                <Btn type="submit" block>
                  Continuar para o pagamento
                </Btn>
                <p className="text-center">
                  <Link to="/carrinho" className="inline-flex min-h-12 items-center text-primary-dark underline">
                    Voltar ao carrinho
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
        <aside className="order-first md:order-none">
          <ResumoPedido />
        </aside>
      </div>
    </div>
  )
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { buscarBox, type Nivel } from './data/boxes'
import {
  atividadesIniciais,
  buscarPlano,
  pedidosIniciais,
  type Atividade,
  type Pedido,
} from './data/exemplos'
import { combo, precoFinal } from './data/promocoes'
import { hojeISO } from './lib/format'

/*
  Estado do protótipo, em memória (com cópia em sessionStorage só para o hot reload
  não deslogar você enquanto edita). Não há back-end nem persistência real.
*/

export type Responsavel = { nome: string; email: string }
export type Crianca = { id: string; nome: string; idade: string; diagnostico: string; gostos: string }
export type NovaCrianca = Omit<Crianca, 'id'> & { id?: string }
export type Endereco = {
  destinatario: string
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  telefone: string
}
export type Assinatura = {
  planoId: string
  inicio: string
  proximaCobranca: string
  forma: string
  proximaBox: string
}
type ItemCarrinho = { boxId: string; qtd: number }

type Dados = {
  usuario: Responsavel | null
  criancas: Crianca[]
  criancaAtivaId: string | null
  carrinho: ItemCarrinho[]
  removido: ItemCarrinho | null
  endereco: Endereco | null
  planoCheckout: string | null
  pedidos: Pedido[]
  ultimoPedido: number | null
  assinatura: Assinatura | null
  atividades: Atividade[]
}

const inicial: Dados = {
  usuario: null,
  criancas: [
    { id: 'c1', nome: 'Lucas', idade: '6', diagnostico: 'TEA nível 1', gostos: 'trens, música, massinha' },
    { id: 'c2', nome: 'Ana', idade: '4', diagnostico: 'TEA nível 2', gostos: 'bolhas de sabão, cores' },
  ],
  criancaAtivaId: 'c1',
  carrinho: [],
  removido: null,
  endereco: null,
  planoCheckout: null,
  pedidos: pedidosIniciais,
  ultimoPedido: null,
  assinatura: {
    planoId: 'mensal',
    inicio: '2026-09-10',
    proximaCobranca: '2026-10-10',
    forma: 'Cartão',
    proximaBox: 'Box Toque',
  },
  atividades: atividadesIniciais,
}

const CHAVE = 'conectea-prototipo-v2'

function carregar(): Dados {
  try {
    const bruto = sessionStorage.getItem(CHAVE)
    if (bruto) return { ...inicial, ...JSON.parse(bruto) }
  } catch {
    // sessionStorage indisponível: segue com os dados iniciais
  }
  return inicial
}

export const nivelDaCrianca = (c: Pick<Crianca, 'diagnostico'> | null | undefined): Nivel | null => {
  const m = c?.diagnostico.match(/nível (\d)/i)
  const n = m ? Number(m[1]) : null
  return n === 1 || n === 2 || n === 3 ? n : null
}

type Linha = { nome: string; qtd: number; preco: number }

type Store = Dados & {
  criancaAtiva: Crianca | null
  entrar: (email: string) => void
  sair: () => void
  atualizarUsuario: (u: Partial<Responsavel>) => void
  salvarCrianca: (c: NovaCrianca) => string
  removerCrianca: (id: string) => void
  selecionarCrianca: (id: string) => void
  adicionarAoCarrinho: (boxId: string) => void
  alterarQtd: (boxId: string, qtd: number) => void
  removerDoCarrinho: (boxId: string) => void
  desfazerRemocao: () => void
  salvarEndereco: (e: Endereco) => void
  escolherPlano: (planoId: string | null) => void
  linhasCarrinho: () => Linha[]
  descontoCombo: () => number
  itensCheckout: () => Linha[]
  totalCheckout: () => number
  quantidadeCarrinho: () => number
  finalizarPedido: (forma: string) => void
  registrarAtividade: (a: Omit<Atividade, 'id'>) => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [d, setD] = useState<Dados>(carregar)

  useEffect(() => {
    try {
      sessionStorage.setItem(CHAVE, JSON.stringify(d))
    } catch {
      // ignora
    }
  }, [d])

  const linhasCarrinho = (): Linha[] =>
    d.carrinho.flatMap((i) => {
      const b = buscarBox(i.boxId)
      return b ? [{ nome: b.nome, qtd: i.qtd, preco: precoFinal(b) }] : []
    })

  const descontoCombo = () => {
    if (d.planoCheckout) return 0
    const linhas = linhasCarrinho()
    const qtd = linhas.reduce((s, l) => s + l.qtd, 0)
    const sub = linhas.reduce((s, l) => s + l.preco * l.qtd, 0)
    return qtd >= combo.minimo ? Math.round(sub * combo.desconto) / 100 : 0
  }

  const itensCheckout = (): Linha[] => {
    const plano = buscarPlano(d.planoCheckout)
    if (plano) return [{ nome: `Plano ${plano.nome}`, qtd: 1, preco: plano.preco }]
    const linhas = linhasCarrinho()
    const desc = descontoCombo()
    return desc > 0 ? [...linhas, { nome: `Desconto do combo (${combo.desconto}%)`, qtd: 1, preco: -desc }] : linhas
  }

  const criancaAtiva = d.criancas.find((c) => c.id === d.criancaAtivaId) ?? d.criancas[0] ?? null

  const store: Store = {
    ...d,
    criancaAtiva,
    entrar: (email) => {
      const local = email.split('@')[0]
      const nome =
        email.trim().toLowerCase() === 'marina@exemplo.com'
          ? 'Marina Souza'
          : local.charAt(0).toUpperCase() + local.slice(1)
      setD((x) => ({ ...x, usuario: { nome, email } }))
    },
    sair: () => setD((x) => ({ ...x, usuario: null, carrinho: [], planoCheckout: null })),
    atualizarUsuario: (u) => setD((x) => (x.usuario ? { ...x, usuario: { ...x.usuario, ...u } } : x)),
    salvarCrianca: (c) => {
      const id = c.id ?? `c${Date.now()}`
      setD((x) => {
        const existe = x.criancas.some((k) => k.id === id)
        const criancas = existe
          ? x.criancas.map((k) => (k.id === id ? { ...c, id } : k))
          : [...x.criancas, { ...c, id }]
        return { ...x, criancas, criancaAtivaId: x.criancaAtivaId ?? id }
      })
      return id
    },
    removerCrianca: (id) =>
      setD((x) => {
        const criancas = x.criancas.filter((k) => k.id !== id)
        return {
          ...x,
          criancas,
          criancaAtivaId: x.criancaAtivaId === id ? (criancas[0]?.id ?? null) : x.criancaAtivaId,
          atividades: x.atividades.filter((a) => a.criancaId !== id),
        }
      }),
    selecionarCrianca: (id) => setD((x) => ({ ...x, criancaAtivaId: id })),
    adicionarAoCarrinho: (boxId) =>
      setD((x) => {
        const ja = x.carrinho.find((i) => i.boxId === boxId)
        const carrinho = ja
          ? x.carrinho.map((i) => (i.boxId === boxId ? { ...i, qtd: i.qtd + 1 } : i))
          : [...x.carrinho, { boxId, qtd: 1 }]
        return { ...x, carrinho, planoCheckout: null }
      }),
    alterarQtd: (boxId, qtd) =>
      setD((x) => ({
        ...x,
        carrinho: x.carrinho.map((i) => (i.boxId === boxId ? { ...i, qtd: Math.max(1, qtd) } : i)),
      })),
    removerDoCarrinho: (boxId) =>
      setD((x) => ({
        ...x,
        removido: x.carrinho.find((i) => i.boxId === boxId) ?? null,
        carrinho: x.carrinho.filter((i) => i.boxId !== boxId),
      })),
    desfazerRemocao: () =>
      setD((x) => (x.removido ? { ...x, carrinho: [...x.carrinho, x.removido], removido: null } : x)),
    salvarEndereco: (endereco) => setD((x) => ({ ...x, endereco })),
    escolherPlano: (planoCheckout) => setD((x) => ({ ...x, planoCheckout })),
    linhasCarrinho,
    descontoCombo,
    itensCheckout,
    totalCheckout: () => itensCheckout().reduce((s, i) => s + i.preco * i.qtd, 0),
    quantidadeCarrinho: () => d.carrinho.reduce((s, i) => s + i.qtd, 0),
    finalizarPedido: (forma) =>
      setD((x) => {
        const itens = itensCheckout()
        const numero = Math.max(1000, ...x.pedidos.map((p) => p.numero)) + 1
        const e = x.endereco
        const endereco = e ? `${e.rua}, ${e.numero}, ${e.bairro}, ${e.cidade}, ${e.estado}` : ''
        const total = Math.round(itens.reduce((s, i) => s + i.preco * i.qtd, 0) * 100) / 100
        const pedido: Pedido = { numero, data: hojeISO(), itens, total, status: 'Recebido', endereco, forma }
        const plano = buscarPlano(x.planoCheckout)
        const assinatura: Assinatura | null = plano
          ? { planoId: plano.id, inicio: hojeISO(), proximaCobranca: hojeISO(), forma, proximaBox: 'Box Calma' }
          : x.assinatura
        return {
          ...x,
          pedidos: [pedido, ...x.pedidos],
          ultimoPedido: numero,
          carrinho: plano ? x.carrinho : [],
          planoCheckout: null,
          assinatura,
        }
      }),
    registrarAtividade: (a) =>
      setD((x) => ({
        ...x,
        atividades: [{ ...a, id: Math.max(0, ...x.atividades.map((t) => t.id)) + 1 }, ...x.atividades],
      })),
  }

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore precisa estar dentro de StoreProvider')
  return s
}

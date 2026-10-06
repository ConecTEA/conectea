import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { buscarBox } from './data/boxes'
import {
  atividadesIniciais,
  buscarPlano,
  pedidosIniciais,
  type Atividade,
  type Pedido,
} from './data/exemplos'
import { hojeISO } from './lib/format'

/*
  Estado do protótipo, em memória (com cópia em sessionStorage só para o hot reload
  não deslogar você enquanto edita). Não há back-end nem persistência real.
*/

export type Responsavel = { nome: string; email: string }
export type Crianca = { nome: string; idade: string; diagnostico: string; gostos: string }
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
  crianca: Crianca | null
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
  crianca: { nome: 'Lucas', idade: '6', diagnostico: 'TEA nível 1', gostos: 'trens, música, massinha' },
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

const CHAVE = 'conectea-prototipo'

function carregar(): Dados {
  try {
    const bruto = sessionStorage.getItem(CHAVE)
    if (bruto) return { ...inicial, ...JSON.parse(bruto) }
  } catch {
    // sessionStorage indisponível: segue com os dados iniciais
  }
  return inicial
}

type Store = Dados & {
  entrar: (email: string) => void
  sair: () => void
  salvarCrianca: (c: Crianca) => void
  adicionarAoCarrinho: (boxId: string) => void
  alterarQtd: (boxId: string, qtd: number) => void
  removerDoCarrinho: (boxId: string) => void
  desfazerRemocao: () => void
  salvarEndereco: (e: Endereco) => void
  escolherPlano: (planoId: string | null) => void
  itensCheckout: () => { nome: string; qtd: number; preco: number }[]
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

  const itensCheckout = () => {
    const plano = buscarPlano(d.planoCheckout)
    if (plano) return [{ nome: `Plano ${plano.nome}`, qtd: 1, preco: plano.preco }]
    return d.carrinho.flatMap((i) => {
      const b = buscarBox(i.boxId)
      return b ? [{ nome: b.nome, qtd: i.qtd, preco: b.preco }] : []
    })
  }

  const store: Store = {
    ...d,
    entrar: (email) => {
      const local = email.split('@')[0]
      const nome =
        email.trim().toLowerCase() === 'marina@exemplo.com'
          ? 'Marina Souza'
          : local.charAt(0).toUpperCase() + local.slice(1)
      setD((x) => ({ ...x, usuario: { nome, email } }))
    },
    sair: () => setD((x) => ({ ...x, usuario: null, carrinho: [], planoCheckout: null })),
    salvarCrianca: (c) => setD((x) => ({ ...x, crianca: c })),
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
    itensCheckout,
    totalCheckout: () => itensCheckout().reduce((s, i) => s + i.preco * i.qtd, 0),
    quantidadeCarrinho: () => d.carrinho.reduce((s, i) => s + i.qtd, 0),
    finalizarPedido: (forma) =>
      setD((x) => {
        const itens = itensCheckout()
        const numero = Math.max(1000, ...x.pedidos.map((p) => p.numero)) + 1
        const e = x.endereco
        const endereco = e ? `${e.rua}, ${e.numero}, ${e.bairro}, ${e.cidade}, ${e.estado}` : ''
        const pedido: Pedido = {
          numero,
          data: hojeISO(),
          itens,
          total: itens.reduce((s, i) => s + i.preco * i.qtd, 0),
          status: 'Recebido',
          endereco,
          forma,
        }
        const plano = buscarPlano(x.planoCheckout)
        const assinatura: Assinatura | null = plano
          ? {
              planoId: plano.id,
              inicio: hojeISO(),
              proximaCobranca: hojeISO(),
              forma,
              proximaBox: 'Box Calma',
            }
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

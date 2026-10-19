/*
  DADOS FICTÍCIOS (EXEMPLO). Nada aqui é definitivo:
  planos, valores e formas de pagamento são [A DEFINIR] pela equipe e pelo orientador.
*/

export type Plano = {
  id: string
  nome: string
  preco: number
  periodicidade: string
  cobranca: string
  inclui: string[]
}

export const planos: Plano[] = [
  {
    id: 'mensal',
    nome: 'Mensal',
    preco: 89.9,
    periodicidade: 'por mês',
    cobranca: 'Cobrança todo mês, no mesmo dia.',
    inclui: ['1 box por mês', 'Escolha da box antes do envio', 'Suporte por mensagem'],
  },
  {
    id: 'trimestral',
    nome: 'Trimestral',
    preco: 249.9,
    periodicidade: 'a cada 3 meses',
    cobranca: 'Uma cobrança a cada 3 meses.',
    inclui: ['3 boxes, uma por mês', 'Escolha da box antes do envio', 'Suporte por mensagem'],
  },
  {
    id: 'semestral',
    nome: 'Semestral',
    preco: 479.9,
    periodicidade: 'a cada 6 meses',
    cobranca: 'Uma cobrança a cada 6 meses.',
    inclui: ['6 boxes, uma por mês', 'Escolha da box antes do envio', 'Suporte por mensagem'],
  },
]

export function buscarPlano(id: string | null | undefined) {
  return planos.find((p) => p.id === id)
}

export type FormaPagamento = { id: string; nome: string; descricao: string }

// Lista como dado: pode mudar sem refazer a tela de pagamento.
export const formasPagamento: FormaPagamento[] = [
  { id: 'cartao', nome: 'Cartão', descricao: 'Preencha os dados do cartão de teste.' },
  { id: 'pix', nome: 'PIX', descricao: 'Use o código de teste abaixo.' },
  { id: 'boleto', nome: 'Boleto', descricao: 'Use a linha digitável de teste.' },
]

export type StatusPedido = 'Recebido' | 'Em preparação' | 'Enviado' | 'Entregue'

export type Pedido = {
  numero: number
  data: string
  itens: { nome: string; qtd: number; preco: number }[]
  total: number
  status: StatusPedido
  endereco: string
  forma: string
}

export const pedidosIniciais: Pedido[] = [
  {
    numero: 1002,
    data: '2026-09-25',
    itens: [{ nome: 'Box Foco', qtd: 1, preco: 99.9 }],
    total: 99.9,
    status: 'Em preparação',
    endereco: 'Rua das Flores, 120, Centro, Videira, SC',
    forma: 'PIX',
  },
  {
    numero: 1001,
    data: '2026-09-10',
    itens: [{ nome: 'Box Calma', qtd: 1, preco: 89.9 }],
    total: 89.9,
    status: 'Entregue',
    endereco: 'Rua das Flores, 120, Centro, Videira, SC',
    forma: 'Cartão',
  },
]

export type Atividade = {
  criancaId?: string
  id: number
  data: string
  atividade: string
  descricao: string
  observacoes?: string
}

export const atividadesIniciais: Atividade[] = [
  {
    id: 5,
    criancaId: 'c2',
    data: '2026-10-07',
    atividade: 'Bolhas de sabão',
    descricao: 'Soprei bolhas e ela tentou pegá-las com as mãos. Riu bastante.',
  },
  {
    id: 4,
    criancaId: 'c1',
    data: '2026-10-05',
    atividade: 'Blocos de encaixe grandes',
    descricao: 'Montamos uma torre de quatro blocos seguindo as cores.',
  },
  {
    id: 3,
    criancaId: 'c1',
    data: '2026-09-28',
    atividade: 'Massinha de modelar',
    descricao: 'Brincamos de fazer bolinhas e cobrinhas juntos por um tempo. Ele pediu para repetir no final.',
  },
  {
    id: 2,
    criancaId: 'c1',
    data: '2026-09-26',
    atividade: 'Bola de textura macia',
    descricao: 'Usamos a bola antes de dormir, em silêncio.',
  },
  {
    id: 1,
    criancaId: 'c1',
    data: '2026-09-22',
    atividade: 'Outra',
    descricao: 'Ouvimos músicas de trem e montamos uma pista com blocos.',
  },
]

export const faq = [
  { p: 'Como funciona a assinatura?', r: 'Você escolhe um plano e recebe uma box por mês. Esta é uma versão de demonstração: nenhuma box é enviada.' },
  { p: 'Posso escolher qual box receber?', r: 'Sim. Na versão final, você escolhe a box antes de cada envio.' },
  { p: 'O pagamento é real?', r: 'Não. Este é um ambiente de testes e nenhuma cobrança é feita. Não digite dados reais.' },
  { p: 'Os brinquedos substituem acompanhamento profissional?', r: 'Não. O conteúdo é informativo e não substitui a orientação de profissionais de saúde.' },
  { p: 'Quais dados da minha criança são guardados?', r: 'Apenas nome, idade, diagnóstico e gostos, se você quiser informar. Nesta demonstração, use dados fictícios.' },
]

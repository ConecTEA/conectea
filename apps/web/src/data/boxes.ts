/*
  DADOS FICTÍCIOS (EXEMPLO). Catálogo, preços e textos ainda são [A DEFINIR] pela equipe.
  Os textos de "estimulo" precisam ser reescritos com embasamento antes da entrega.
*/

export type Brinquedo = { nome: string; estimulo: string }

export type Box = {
  id: string
  nome: string
  preco: number
  descricao: string
  cor: string // classe Tailwind de fundo, lida do tema
  brinquedos: Brinquedo[]
}

export const boxes: Box[] = [
  {
    id: 'calma',
    nome: 'Box Calma',
    preco: 89.9,
    descricao: 'Itens para momentos de descanso e organização da rotina.',
    cor: 'bg-lilac',
    brinquedos: [
      { nome: 'Bola de textura macia', estimulo: 'Estímulo tátil e atenção às sensações das mãos.' },
      { nome: 'Pote de calma com glitter', estimulo: 'Estímulo visual e foco em movimentos lentos.' },
      { nome: 'Almofada com peso leve', estimulo: 'Pressão suave, usada em momentos de descanso.' },
      { nome: 'Cartões de respiração', estimulo: 'Apoio visual para atividades guiadas de respiração.' },
    ],
  },
  {
    id: 'toque',
    nome: 'Box Toque',
    preco: 94.9,
    descricao: 'Itens com texturas variadas para explorar com as mãos.',
    cor: 'bg-lemon',
    brinquedos: [
      { nome: 'Massinha de modelar', estimulo: 'Estímulo tátil e coordenação motora fina.' },
      { nome: 'Tapete de texturas', estimulo: 'Exploração de diferentes sensações com mãos e pés.' },
      { nome: 'Caixa de areia cinética', estimulo: 'Estímulo tátil e criatividade.' },
      { nome: 'Fitas sensoriais', estimulo: 'Estímulo visual e tátil com movimentos suaves.' },
    ],
  },
  {
    id: 'foco',
    nome: 'Box Foco',
    preco: 99.9,
    descricao: 'Itens para atividades de atenção e encaixe.',
    cor: 'bg-aqua',
    brinquedos: [
      { nome: 'Blocos de encaixe grandes', estimulo: 'Coordenação motora e planejamento de sequência.' },
      { nome: 'Quebra-cabeça de 6 peças', estimulo: 'Atenção visual e resolução de problemas simples.' },
      { nome: 'Cordão de contas', estimulo: 'Coordenação olho-mão e concentração.' },
      { nome: 'Jogo de classificar por cor', estimulo: 'Percepção de cores e categorização.' },
      { nome: 'Cartões de sequência do dia', estimulo: 'Apoio visual para compreender a rotina.' },
    ],
  },
  {
    id: 'explorar',
    nome: 'Box Explorar',
    preco: 109.9,
    descricao: 'Itens para brincar junto e explorar sons e movimentos.',
    cor: 'bg-peach',
    brinquedos: [
      { nome: 'Chocalhos de sons suaves', estimulo: 'Estímulo auditivo e atenção a sons.' },
      { nome: 'Túnel de tecido', estimulo: 'Movimento corporal e brincadeira compartilhada.' },
      { nome: 'Espelho inquebrável', estimulo: 'Exploração de expressões e interação.' },
      { nome: 'Instrumento de percussão infantil', estimulo: 'Ritmo e interação com o adulto.' },
      { nome: 'Livro de tecido', estimulo: 'Exploração tátil e apoio à hora da história.' },
    ],
  },
]

export function buscarBox(id: string | undefined) {
  return boxes.find((b) => b.id === id)
}

/*
  DADOS FICTÍCIOS (EXEMPLO). Catálogo, preços e textos ainda são [A DEFINIR] pela equipe.
  Os textos de "estimulo" e as dicas precisam ser reescritos e revisados com embasamento
  (pedagogo ou psicólogo) antes da entrega. As boxes são sugestões de uso e não substituem
  a orientação de profissionais de saúde.
*/

export type Nivel = 1 | 2 | 3

export const niveis: { nivel: Nivel; nome: string; resumo: string }[] = [
  { nivel: 1, nome: 'Nível 1', resumo: 'Precisa de apoio' },
  { nivel: 2, nome: 'Nível 2', resumo: 'Precisa de apoio substancial' },
  { nivel: 3, nome: 'Nível 3', resumo: 'Precisa de apoio muito substancial' },
]

export type Brinquedo = { nome: string; estimulo: string }

export type Box = {
  id: string
  nome: string
  preco: number
  descricao: string
  foco: string
  niveis: Nivel[]
  cor: string // classe Tailwind de fundo, lida do tema
  brinquedos: Brinquedo[]
  dicas: string[]
}

const t = (nome: string, estimulo: string): Brinquedo => ({ nome, estimulo })
const cores = ['bg-lilac', 'bg-lemon', 'bg-aqua', 'bg-peach']

const lista: Omit<Box, 'cor'>[] = [
  // Todos os níveis e níveis 1 e 2
  {
    id: 'calma',
    nome: 'Box Calma',
    preco: 89.9,
    descricao: 'Itens para momentos de descanso e organização da rotina.',
    foco: 'Descanso e rotina',
    niveis: [1, 2, 3],
    brinquedos: [
      t('Bola de textura macia', 'Estímulo tátil e atenção às sensações das mãos.'),
      t('Pote de calma com glitter', 'Estímulo visual e foco em movimentos lentos.'),
      t('Almofada com peso leve', 'Pressão suave, usada em momentos de descanso.'),
      t('Cartões de respiração', 'Apoio visual para atividades guiadas de respiração.'),
    ],
    dicas: [
      'Escolha um canto fixo e tranquilo da casa para usar a box.',
      'Ofereça os itens sempre no mesmo momento do dia, para criar rotina.',
      'Deixe a criança escolher qual item usar primeiro.',
    ],
  },
  {
    id: 'toque',
    nome: 'Box Toque',
    preco: 94.9,
    descricao: 'Itens com texturas variadas para explorar com as mãos.',
    foco: 'Exploração tátil',
    niveis: [2, 3],
    brinquedos: [
      t('Massinha de modelar', 'Estímulo tátil e coordenação motora fina.'),
      t('Tapete de texturas', 'Exploração de diferentes sensações com mãos e pés.'),
      t('Caixa de areia cinética', 'Estímulo tátil e criatividade.'),
      t('Fitas sensoriais', 'Estímulo visual e tátil com movimentos suaves.'),
    ],
    dicas: [
      'Comece com poucos segundos de contato e aumente aos poucos.',
      'Respeite se a criança preferir tocar só algumas texturas.',
      'Lave as mãos juntos antes e depois da atividade.',
    ],
  },
  {
    id: 'foco',
    nome: 'Box Foco',
    preco: 99.9,
    descricao: 'Itens para atividades de atenção e encaixe.',
    foco: 'Atenção e encaixe',
    niveis: [1, 2],
    brinquedos: [
      t('Blocos de encaixe grandes', 'Coordenação motora e planejamento de sequência.'),
      t('Quebra-cabeça de 6 peças', 'Atenção visual e resolução de problemas simples.'),
      t('Cordão de contas', 'Coordenação olho-mão e concentração.'),
      t('Jogo de classificar por cor', 'Percepção de cores e categorização.'),
      t('Cartões de sequência do dia', 'Apoio visual para compreender a rotina.'),
    ],
    dicas: [
      'Separe o material por cor antes de começar.',
      'Se errar, mostre de novo com calma, sem corrigir de imediato.',
      'Comece com poucas peças e aumente quando a criança se sentir segura.',
    ],
  },
  {
    id: 'explorar',
    nome: 'Box Explorar',
    preco: 109.9,
    descricao: 'Itens para brincar junto e explorar sons e movimentos.',
    foco: 'Sons e movimento',
    niveis: [1, 2],
    brinquedos: [
      t('Chocalhos de sons suaves', 'Estímulo auditivo e atenção a sons.'),
      t('Túnel de tecido', 'Movimento corporal e brincadeira compartilhada.'),
      t('Espelho inquebrável', 'Exploração de expressões e interação.'),
      t('Instrumento de percussão infantil', 'Ritmo e interação com o adulto.'),
      t('Livro de tecido', 'Exploração tátil e apoio à hora da história.'),
    ],
    dicas: [
      'Comece em um ambiente silencioso para o som se destacar.',
      'Brinque junto: o adulto repete o som ou o movimento da criança.',
      'Se o som incomodar, afaste o brinquedo e tente com mais suavidade.',
    ],
  },

  // Nível 1
  {
    id: 'conversa',
    nome: 'Box Conversa',
    preco: 104.9,
    descricao: 'Jogos para praticar conversa, emoções e brincadeiras em turnos.',
    foco: 'Conversa e emoções',
    niveis: [1],
    brinquedos: [
      t('Cartas de emoções', 'Reconhecer e nomear emoções com apoio de imagens.'),
      t('Jogo de turnos com dado', 'Esperar a vez e brincar em dupla ou em grupo.'),
      t('Fantoches de dedo', 'Imaginação e conversa por meio de personagens.'),
      t('Roteiros de conversa ilustrados', 'Apoio visual para começar e manter uma conversa.'),
    ],
    dicas: [
      'Escolha uma emoção por dia e procure-a em situações reais.',
      'Combine antes quem começa e como o jogo termina.',
      'Comemore a tentativa, não só o acerto.',
    ],
  },
  {
    id: 'rotina',
    nome: 'Box Rotina',
    preco: 92.9,
    descricao: 'Apoios visuais para organizar o dia e ganhar autonomia nas tarefas.',
    foco: 'Rotina e autonomia',
    niveis: [1, 2],
    brinquedos: [
      t('Agenda visual semanal', 'Ver o que vem a seguir ajuda a antecipar o dia.'),
      t('Relógio de areia colorido', 'Noção de tempo de forma visual.'),
      t('Quadro de tarefas com ímãs', 'Marcar tarefas feitas e acompanhar o progresso.'),
      t('Cartões de passos (escovar os dentes)', 'Apoio visual para tarefas do dia a dia.'),
    ],
    dicas: [
      'Monte a agenda junto com a criança, uma vez por semana.',
      'Avise e mostre antes quando a rotina mudar.',
      'Deixe o quadro de tarefas à altura da criança.',
    ],
  },
  {
    id: 'criar',
    nome: 'Box Criar',
    preco: 97.9,
    descricao: 'Arte e construção para expressar ideias com as mãos.',
    foco: 'Arte e construção',
    niveis: [1],
    brinquedos: [
      t('Kit de argila', 'Criatividade e coordenação motora fina.'),
      t('Tintas de dedo laváveis', 'Expressão livre e estímulo tátil.'),
      t('Peças de montar pequenas', 'Planejamento, atenção e construção.'),
      t('Livro de colorir com texturas', 'Atenção e exploração tátil enquanto colore.'),
    ],
    dicas: [
      'Proteja a mesa antes e deixe a bagunça acontecer.',
      'Mostre um exemplo, mas aceite a versão da criança.',
      'Guardem os trabalhos em um lugar para a criança rever depois.',
    ],
  },

  // Nível 2
  {
    id: 'comunicar',
    nome: 'Box Comunicar',
    preco: 109.9,
    descricao: 'Imagens e cartões para pedir, escolher e contar o que acontece.',
    foco: 'Comunicação com imagens',
    niveis: [2],
    brinquedos: [
      t('Cartões de figuras de pedidos', 'Apoio visual para pedir o que quer.'),
      t('Painel de escolhas', 'Escolher entre duas ou mais opções.'),
      t('Livro de histórias com imagens', 'Atenção compartilhada e vocabulário.'),
      t('Dado de perguntas simples', 'Responder perguntas curtas em uma brincadeira.'),
    ],
    dicas: [
      'Use as mesmas figuras em casa e na escola, se possível.',
      'Espere alguns segundos antes de ajudar: a criança pode precisar de tempo.',
      'Mostre a figura e diga a palavra ao mesmo tempo.',
    ],
  },
  {
    id: 'passo-a-passo',
    nome: 'Box Passo a Passo',
    preco: 99.9,
    descricao: 'Sequências curtas para aprender a ordem das coisas, uma de cada vez.',
    foco: 'Sequências simples',
    niveis: [2],
    brinquedos: [
      t('Quebra-cabeça de sequência de 3 peças', 'Entender a ordem de começo, meio e fim.'),
      t('Caixas de encaixe por forma', 'Percepção de formas e coordenação.'),
      t('Cartões "primeiro, depois"', 'Apoio visual para esperar e antecipar.'),
      t('Timer visual', 'Ver quanto tempo falta para a atividade acabar.'),
    ],
    dicas: [
      'Comece com duas etapas ("primeiro, depois") e aumente aos poucos.',
      'Use o timer visual para avisar o fim da atividade.',
      'Termine sempre com algo que a criança gosta.',
    ],
  },
  {
    id: 'sentidos',
    nome: 'Box Sentidos',
    preco: 102.9,
    descricao: 'Exploração guiada de cores, cheiros suaves e texturas.',
    foco: 'Exploração dos sentidos',
    niveis: [2, 3],
    brinquedos: [
      t('Garrafas sensoriais', 'Estímulo visual e foco em movimentos lentos.'),
      t('Almofadas de texturas', 'Exploração tátil variada.'),
      t('Caixa de cheiros suaves', 'Exploração do olfato, com aromas leves.'),
      t('Lanterna de cores', 'Estímulo visual em ambiente com pouca luz.'),
    ],
    dicas: [
      'Apresente um sentido de cada vez, para não sobrecarregar.',
      'Observe sinais de desconforto e interrompa se preciso.',
      'Use a lanterna em um quarto com pouca luz, sem piscar.',
    ],
  },

  // Nível 3
  {
    id: 'regular',
    nome: 'Box Regular',
    preco: 112.9,
    descricao: 'Itens de apoio para momentos de descanso e segurança.',
    foco: 'Descanso e segurança',
    niveis: [3],
    brinquedos: [
      t('Cobertor com peso leve', 'Pressão suave, usada em momentos de descanso.'),
      t('Protetor auricular infantil', 'Reduz sons altos em ambientes barulhentos.'),
      t('Bola de apertar resistente', 'Estímulo tátil e de pressão com as mãos.'),
      t('Almofada de apoio', 'Conforto e postura confortável ao sentar.'),
    ],
    dicas: [
      'Experimente cada item por pouco tempo e observe a reação.',
      'Nunca prenda a criança com o cobertor. Ela deve poder tirá-lo.',
      'Combine com o profissional que acompanha a criança como usar os itens.',
    ],
  },
  {
    id: 'causa-efeito',
    nome: 'Box Causa e Efeito',
    preco: 105.9,
    descricao: 'Brinquedos que respondem ao toque com luz e som suaves.',
    foco: 'Causa e efeito',
    niveis: [3],
    brinquedos: [
      t('Brinquedo de luz ao toque', 'Descobrir que uma ação provoca uma resposta.'),
      t('Caixa de sons suaves', 'Estímulo auditivo e atenção a sons.'),
      t('Bolhas de sabão', 'Atenção visual e brincadeira compartilhada.'),
      t('Brinquedo de apertar com som', 'Coordenação da mão e resposta imediata.'),
    ],
    dicas: [
      'Mostre a ação uma vez e deixe a criança tentar no tempo dela.',
      'Comemore cada resposta, mesmo pequena.',
      'Use volumes baixos e verifique se o som é confortável.',
    ],
  },
  {
    id: 'toque-seguro',
    nome: 'Box Toque Seguro',
    preco: 98.9,
    descricao: 'Texturas macias e grandes, seguras para explorar com as mãos.',
    foco: 'Texturas seguras',
    niveis: [3],
    brinquedos: [
      t('Tecido sensorial macio', 'Exploração tátil em diferentes tamanhos.'),
      t('Bolinhas texturizadas grandes', 'Estímulo tátil, sem peças pequenas.'),
      t('Livro de tecido', 'Exploração tátil e apoio à hora da história.'),
      t('Tapete macio', 'Conforto para brincar no chão.'),
    ],
    dicas: [
      'Escolha um horário em que a criança esteja descansada.',
      'Ofereça uma textura por vez e espere a reação.',
      'Lave os tecidos regularmente, sem produtos de cheiro forte.',
    ],
  },
]

export const boxes: Box[] = lista.map((b, i) => ({ ...b, cor: cores[i % cores.length] }))

export function buscarBox(id: string | undefined) {
  return boxes.find((b) => b.id === id)
}

export function boxesDoNivel(n: Nivel | null) {
  return n ? boxes.filter((b) => b.niveis.includes(n)) : boxes
}

export const rotuloNiveis = (ns: Nivel[]) => (ns.length === 3 ? 'Todos os níveis' : `Nível ${ns.join(' e ')}`)

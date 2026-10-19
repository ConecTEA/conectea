/*
  TUTORIAIS (EXEMPLO). Os textos abaixo são rascunhos da equipe de desenvolvimento e
  precisam ser reescritos e revisados com embasamento antes da entrega [A DEFINIR].
  Os vídeos ainda não existem: quando houver, preencha `videoUrl` (arquivo .mp4 ou .webm
  em /public) e o player aparece sozinho no lugar do aviso "Vídeo em produção".
*/

export type Tutorial = {
  id: string
  titulo: string
  boxId: string
  brinquedo: string // igual ao nome do brinquedo em boxes.ts
  duracao: string
  resumo: string
  passos: string[]
  dicas: string[]
  cuidados: string[]
  videoUrl?: string
}

const cuidadosBase = [
  'Brinque sempre acompanhando a criança.',
  'Confira se não há peças soltas ou danificadas antes de começar.',
  'Pare se a criança demonstrar desconforto. Pode tentar de novo outro dia.',
]

export const tutoriais: Tutorial[] = [
  {
    id: 'massinha-de-modelar',
    titulo: 'Como brincar com a massinha de modelar',
    boxId: 'toque',
    brinquedo: 'Massinha de modelar',
    duracao: '3 min',
    resumo: 'Explore a textura da massinha com as mãos e faça formas simples, juntos.',
    passos: [
      'Separe uma porção do tamanho de uma bola pequena e entregue para a criança.',
      'Mostre como apertar, rolar e esticar. Deixe a criança explorar no ritmo dela.',
      'Faça uma forma simples, como uma bolinha ou uma cobrinha, e convide a criança a repetir.',
      'Ao terminar, guardem a massinha juntos no pote fechado.',
    ],
    dicas: ['Use a mesma bancada e o mesmo horário para criar uma rotina.', 'Se a textura incomodar, comece com poucos segundos.'],
    cuidados: [...cuidadosBase, 'Não é comestível. Lave as mãos depois.'],
  },
  {
    id: 'bola-de-textura-macia',
    titulo: 'Como usar a bola de textura macia',
    boxId: 'calma',
    brinquedo: 'Bola de textura macia',
    duracao: '2 min',
    resumo: 'Uma atividade curta para momentos de descanso, antes de dormir ou depois da escola.',
    passos: [
      'Escolha um lugar tranquilo, com pouca luz e pouco barulho.',
      'Entregue a bola e deixe a criança segurar e apertar como quiser.',
      'Fale baixo e devagar, descrevendo o que sente: "macia", "redonda".',
      'Encerre combinando que a bola volta para a caixa até a próxima vez.',
    ],
    dicas: ['Ofereça a bola sempre no mesmo momento do dia.', 'Registre a atividade no histórico para acompanhar o que funciona.'],
    cuidados: cuidadosBase,
  },
  {
    id: 'pote-de-calma',
    titulo: 'Como usar o pote de calma com glitter',
    boxId: 'calma',
    brinquedo: 'Pote de calma com glitter',
    duracao: '3 min',
    resumo: 'Agitar o pote e acompanhar o glitter descer, respirando junto.',
    passos: [
      'Sente-se ao lado da criança e segure o pote fechado.',
      'Agite o pote devagar e peça para a criança observar o glitter.',
      'Respirem juntos, uma respiração a cada vez que o glitter desce um pouco.',
      'Quando o glitter assentar, converse em voz baixa sobre como estão se sentindo.',
    ],
    dicas: ['Deixe o pote em um lugar fixo e fácil de alcançar.'],
    cuidados: [...cuidadosBase, 'Não abra o pote. Se rachar, retire do alcance da criança.'],
  },
  {
    id: 'cartoes-de-respiracao',
    titulo: 'Como usar os cartões de respiração',
    boxId: 'calma',
    brinquedo: 'Cartões de respiração',
    duracao: '4 min',
    resumo: 'Cartões com imagens para seguir uma respiração guiada, um passo de cada vez.',
    passos: [
      'Espalhe os cartões na mesa e deixe a criança escolher um.',
      'Mostre a imagem e faça o movimento junto: inspirar, segurar, soltar.',
      'Troque de cartão a cada rodada e deixe a criança liderar quando quiser.',
      'Guarde os cartões em ordem, para a próxima vez.',
    ],
    dicas: ['Comece com uma rodada só e aumente aos poucos.'],
    cuidados: cuidadosBase,
  },
  {
    id: 'tapete-de-texturas',
    titulo: 'Como explorar o tapete de texturas',
    boxId: 'toque',
    brinquedo: 'Tapete de texturas',
    duracao: '3 min',
    resumo: 'Passeio por diferentes sensações com as mãos e os pés.',
    passos: [
      'Estenda o tapete em uma superfície plana e sem escorregar.',
      'Mostre cada textura com a sua própria mão e diga o nome dela.',
      'Convide a criança a tocar com as mãos e, se quiser, com os pés descalços.',
      'Deixe a criança escolher a ordem e quanto tempo fica em cada parte.',
    ],
    dicas: ['Respeite se a criança preferir tocar só algumas texturas.'],
    cuidados: cuidadosBase,
  },
  {
    id: 'blocos-de-encaixe',
    titulo: 'Como brincar com os blocos de encaixe grandes',
    boxId: 'foco',
    brinquedo: 'Blocos de encaixe grandes',
    duracao: '4 min',
    resumo: 'Construir torres e sequências de cores, um bloco por vez.',
    passos: [
      'Separe os blocos por cor e coloque-os à frente da criança.',
      'Encaixe dois blocos para mostrar como funciona.',
      'Peça uma torre com a mesma sequência de cores. Comece com três blocos.',
      'Aumente a torre aos poucos e comemore cada encaixe.',
    ],
    dicas: ['Deixe a criança errar sem corrigir de imediato. Mostre de novo, com calma.'],
    cuidados: cuidadosBase,
  },
  {
    id: 'cartoes-de-sequencia-do-dia',
    titulo: 'Como usar os cartões de sequência do dia',
    boxId: 'foco',
    brinquedo: 'Cartões de sequência do dia',
    duracao: '5 min',
    resumo: 'Montar a rotina do dia com imagens, para a criança saber o que vem depois.',
    passos: [
      'Escolha com a criança os cartões das atividades de hoje.',
      'Coloque os cartões em fila, da esquerda para a direita, na ordem do dia.',
      'A cada atividade concluída, a criança vira ou retira o cartão.',
      'Se a rotina mudar, avise e troque os cartões antes, mostrando a mudança.',
    ],
    dicas: ['Mantenha os cartões sempre no mesmo lugar, à altura da criança.'],
    cuidados: cuidadosBase,
  },
  {
    id: 'chocalhos-de-sons-suaves',
    titulo: 'Como brincar com os chocalhos de sons suaves',
    boxId: 'explorar',
    brinquedo: 'Chocalhos de sons suaves',
    duracao: '3 min',
    resumo: 'Descobrir sons diferentes e criar um ritmo juntos.',
    passos: [
      'Mostre um chocalho de cada vez e deixe a criança ouvir de perto.',
      'Balance devagar e peça que ela imite o movimento.',
      'Crie um ritmo simples, como três batidas, e convide a criança a repetir.',
      'Se o som incomodar, afaste o chocalho e tente com mais suavidade.',
    ],
    dicas: ['Comece em um ambiente silencioso para o som se destacar.'],
    cuidados: [...cuidadosBase, 'Se o som incomodar, interrompa a atividade.'],
  },
]

export const buscarTutorial = (id: string | undefined) => tutoriais.find((t) => t.id === id)
export const tutorialDoBrinquedo = (nome: string) => tutoriais.find((t) => t.brinquedo === nome)

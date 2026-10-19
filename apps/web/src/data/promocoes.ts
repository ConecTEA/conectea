/*
  PROMOÇÕES (EXEMPLO). Descontos, regras e datas ainda são [A DEFINIR] pela equipe.
  A "Promoção da semana" troca sozinha toda segunda-feira, para dar um motivo de voltar.
*/
import { buscarBox, type Box } from './boxes'

export type Promocao = {
  id: string
  titulo: string
  descricao: string
  boxId: string
  desconto: number // percentual
}

// Rodízio semanal: uma promoção por semana, em ordem.
export const promocoesSemanais: Promocao[] = [
  { id: 'sem-calma', titulo: 'Semana da Calma', descricao: 'Itens para descanso com desconto nesta semana.', boxId: 'calma', desconto: 15 },
  { id: 'sem-conversa', titulo: 'Semana da Conversa', descricao: 'Jogos de emoções e conversa em oferta.', boxId: 'conversa', desconto: 20 },
  { id: 'sem-comunicar', titulo: 'Semana da Comunicação', descricao: 'Figuras e painéis para pedir e escolher.', boxId: 'comunicar', desconto: 15 },
  { id: 'sem-regular', titulo: 'Semana do Descanso', descricao: 'Apoio para momentos de segurança e descanso.', boxId: 'regular', desconto: 10 },
  { id: 'sem-rotina', titulo: 'Semana da Rotina', descricao: 'Agenda visual e quadro de tarefas.', boxId: 'rotina', desconto: 20 },
  { id: 'sem-sentidos', titulo: 'Semana dos Sentidos', descricao: 'Texturas, cores e aromas suaves.', boxId: 'sentidos', desconto: 15 },
]

// Promoções fixas do mês.
export const promocoesDoMes: Promocao[] = [
  { id: 'mes-foco', titulo: 'Foco do mês', descricao: 'Atenção e encaixe com preço especial.', boxId: 'foco', desconto: 10 },
  { id: 'mes-toque', titulo: 'Toque do mês', descricao: 'Texturas variadas com preço especial.', boxId: 'toque', desconto: 10 },
]

// Combo: ao levar 2 ou mais boxes, desconto sobre o total das boxes.
export const combo = { minimo: 2, desconto: 10 }

const DIA = 24 * 60 * 60 * 1000

function inicioDaSemana(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const dia = (x.getDay() + 6) % 7 // segunda = 0
  return new Date(x.getTime() - dia * DIA)
}

export function semanaDoAno(d = new Date()) {
  const ini = new Date(d.getFullYear(), 0, 1)
  return Math.floor((inicioDaSemana(d).getTime() - inicioDaSemana(ini).getTime()) / (7 * DIA))
}

export function promocaoDaSemana(d = new Date()) {
  return promocoesSemanais[semanaDoAno(d) % promocoesSemanais.length]
}

export function proximaPromocao(d = new Date()) {
  return promocoesSemanais[(semanaDoAno(d) + 1) % promocoesSemanais.length]
}

export function validadeDaSemana(d = new Date()) {
  const fim = new Date(inicioDaSemana(d).getTime() + 6 * DIA)
  return fim
}

export function proximaSegunda(d = new Date()) {
  return new Date(inicioDaSemana(d).getTime() + 7 * DIA)
}

export function todasAsPromocoesAtivas(d = new Date()) {
  return [promocaoDaSemana(d), ...promocoesDoMes]
}

export function promocaoDaBox(boxId: string, d = new Date()) {
  const ativas = todasAsPromocoesAtivas(d).filter((p) => p.boxId === boxId)
  return ativas.sort((a, b) => b.desconto - a.desconto)[0] ?? null
}

export function precoFinal(box: Box, d = new Date()) {
  const p = promocaoDaBox(box.id, d)
  return p ? Math.round(box.preco * (1 - p.desconto / 100) * 100) / 100 : box.preco
}

export function precoFinalPorId(boxId: string) {
  const b = buscarBox(boxId)
  return b ? precoFinal(b) : 0
}

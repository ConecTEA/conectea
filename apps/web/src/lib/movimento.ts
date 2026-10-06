const CHAVE = 'conectea-reduzir-animacoes'

export function sistemaPedeMenosMovimento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function lerReduzido() {
  try {
    return localStorage.getItem(CHAVE) === '1'
  } catch {
    return false
  }
}

export function aplicarMovimento(reduzido: boolean) {
  document.documentElement.dataset.movimento = reduzido ? 'reduzido' : 'normal'
  try {
    localStorage.setItem(CHAVE, reduzido ? '1' : '0')
  } catch {
    // sem armazenamento: vale só nesta visita
  }
}

export function movimentoReduzido() {
  return sistemaPedeMenosMovimento() || document.documentElement.dataset.movimento === 'reduzido'
}

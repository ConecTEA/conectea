import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Btn } from './Btn'
import { Field } from './Field'
import { msg, soNumeros, temErro, vazio, type Erros } from '../lib/validate'
import type { Crianca } from '../store'

// O Plano de Projeto pede "nome, idade e diagnóstico": o campo é obrigatório,
// mas "Prefiro não informar" é uma resposta válida (minimização, ADR-001).
const SELECIONE = 'Selecione uma opção'
const diagnosticos = [SELECIONE, 'Prefiro não informar', 'TEA nível 1', 'TEA nível 2', 'TEA nível 3', 'Em investigação']

type Props = {
  inicial?: Partial<Crianca> | null
  rotuloSalvar: string
  onSalvar: (c: Omit<Crianca, 'id'>) => void
  onCancelar: () => void
}

export function FormCrianca({ inicial, rotuloSalvar, onSalvar, onCancelar }: Props) {
  const [nome, setNome] = useState(inicial?.nome ?? '')
  const [idade, setIdade] = useState(inicial?.idade ?? '')
  const [diag, setDiag] = useState(inicial?.diagnostico || SELECIONE)
  const [gostos, setGostos] = useState(inicial?.gostos ?? '')
  const [erros, setErros] = useState<Erros>({})

  function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(nome)) n.nome = msg.obrigatorio
    if (vazio(idade)) n.idade = msg.obrigatorio
    else if (!soNumeros(idade)) n.idade = msg.numero
    else if (Number(idade) > 17) n.idade = 'Informe uma idade de 0 a 17 anos.'
    if (diag === SELECIONE) n.diagnostico = msg.obrigatorio
    setErros(n)
    if (temErro(n)) return
    onSalvar({ nome: nome.trim(), idade: idade.trim(), diagnostico: diag, gostos: gostos.trim() })
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <Field
        label="Nome ou apelido"
        id="nome"
        required
        maxLength={60}
        value={nome}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
        help="Usamos o nome para deixar as telas mais claras para você."
        error={erros.nome}
      />
      <Field
        label="Idade (em anos)"
        id="idade"
        required
        inputMode="numeric"
        maxLength={2}
        value={idade}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIdade(e.target.value)}
        help="Usamos a idade para sugerir boxes adequadas."
        error={erros.idade}
      />
      <Field
        label="Diagnóstico"
        id="diagnostico"
        as="select"
        options={diagnosticos}
        required
        value={diag}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setDiag(e.target.value)}
        help="Você pode escolher “Prefiro não informar”."
        error={erros.diagnostico}
      />
      <Field
        label="Gostos e interesses"
        id="gostos"
        maxLength={200}
        value={gostos}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setGostos(e.target.value)}
        help="Exemplo: trens, música, massinha. Ajuda a escolher atividades."
        counter={{ atual: gostos.length, max: 200 }}
      />
      <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:justify-start">
        <Btn type="submit" className="w-full sm:w-auto">
          {rotuloSalvar}
        </Btn>
        <Btn variant="ghost" onClick={onCancelar} className="w-full sm:w-auto">
          Cancelar
        </Btn>
      </div>
    </form>
  )
}

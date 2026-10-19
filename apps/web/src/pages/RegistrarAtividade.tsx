import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Btn } from '../components/Btn'
import { Field } from '../components/Field'
import { Card, Titulo } from '../components/ui'
import { boxes } from '../data/boxes'
import { hojeISO } from '../lib/format'
import { msg, temErro, vazio, type Erros } from '../lib/validate'
import { useStore } from '../store'

const opcoes = [...new Set(boxes.flatMap((b) => b.brinquedos.map((t) => t.nome))), 'Outra']

export default function RegistrarAtividade() {
  const { registrarAtividade, criancas, criancaAtiva } = useStore()
  const [criancaId, setCriancaId] = useState(criancaAtiva?.id ?? '')
  const nav = useNavigate()
  const [data, setData] = useState(hojeISO())
  const [atividade, setAtividade] = useState(opcoes[0])
  const [descricao, setDescricao] = useState('')
  const [obs, setObs] = useState('')
  const [erros, setErros] = useState<Erros>({})

  function enviar(e: FormEvent) {
    e.preventDefault()
    const n: Erros = {}
    if (vazio(data)) n.data = msg.obrigatorio
    if (vazio(descricao)) n.descricao = msg.obrigatorio
    setErros(n)
    if (temErro(n)) return
    registrarAtividade({ criancaId: criancaId || undefined, data, atividade, descricao: descricao.trim(), observacoes: obs.trim() || undefined })
    nav('/atividades/historico', { state: { salvo: true } })
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <Titulo apoio="Registre apenas o que você achar útil.">Registrar atividade</Titulo>
      <Card>
        <form onSubmit={enviar} noValidate className="space-y-4">
          {criancas.length > 1 ? (
            <div>
              <p id="rotulo-crianca" className="mb-1 font-medium">
                Criança <span className="text-ink-soft">(obrigatório)</span>
              </p>
              <div role="group" aria-labelledby="rotulo-crianca" className="flex flex-wrap gap-2">
                {criancas.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={criancaId === c.id}
                    onClick={() => setCriancaId(c.id)}
                    className={`min-h-12 rounded-full border-2 px-5 font-semibold transition ${
                      criancaId === c.id ? 'border-violet bg-violet text-white' : 'border-line bg-surface hover:bg-lilac'
                    }`}
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className="max-w-[240px]">
            <Field label="Data" id="data" type="date" required value={data} onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)} error={erros.data} />
          </div>
          <Field
            label="Atividade realizada"
            id="atividade"
            as="select"
            options={opcoes}
            required
            value={atividade}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAtividade(e.target.value)}
          />
          <Field
            label="Descrição"
            id="descricao"
            as="textarea"
            required
            maxLength={500}
            value={descricao}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
            counter={{ atual: descricao.length, max: 500 }}
            error={erros.descricao}
            help="Conte o que foi feito, em poucas frases."
          />
          <Field
            label="Observações"
            id="obs"
            as="textarea"
            maxLength={300}
            value={obs}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setObs(e.target.value)}
            counter={{ atual: obs.length, max: 300 }}
          />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:justify-start">
            <Btn type="submit" className="w-full sm:w-auto">
              Salvar atividade
            </Btn>
            <Btn variant="ghost" onClick={() => nav('/atividades/historico')} className="w-full sm:w-auto">
              Cancelar
            </Btn>
          </div>
        </form>
      </Card>
    </div>
  )
}

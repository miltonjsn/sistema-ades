'use client'

import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'

interface Participante {
  id: number
  nome: string
}

interface Atividade {
  id: number
  nome: string
  data?: string
}

interface Presenca {
  id: number
  participante_id?: number
  atividade_id?: number
  data?: string
  participantes?: Participante
  atividades?: Atividade
}

export default function CadastroPresenca() {
  const [presencas, setPresencas] = useState<Presenca[]>([])
  const [participantes, setParticipantes] = useState<Participante[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])

  const [participanteId, setParticipanteId] = useState<number | undefined>(undefined)
  const [atividadeId, setAtividadeId] = useState<number | undefined>(undefined)
  const [data, setData] = useState('')

  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchPresencas()
    fetchParticipantes()
    fetchAtividades()
  }, [])

  async function fetchPresencas() {
    try {
      const res = await fetch('/api/presencas')
      const data = await res.json()
      setPresencas(data)
    } catch (error) {
      console.error('Erro ao buscar presenças:', error)
    }
  }

  async function fetchParticipantes() {
    try {
      const res = await fetch('/api/participantes')
      const data = await res.json()
      setParticipantes(data)
    } catch (error) {
      console.error('Erro ao buscar participantes:', error)
    }
  }

  async function fetchAtividades() {
    try {
      const res = await fetch('/api/atividades')
      const data = await res.json()
      setAtividades(data)
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!participanteId || !atividadeId) {
      setMsg('Selecione participante e atividade')
      return
    }

    const res = await fetch('/api/presencas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participante_id: participanteId,
        atividade_id: atividadeId,
        data: data || new Date().toISOString().substring(0, 10),
      }),
    })

    if (res.ok) {
      setMsg('Presença cadastrada com sucesso!')
      setParticipanteId(undefined)
      setAtividadeId(undefined)
      setData('')
      fetchPresencas()
    } else {
      setMsg('Erro ao cadastrar presença.')
    }
  }

  return (
    <Layout>
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Presença</h1>
        {msg && <p className="mb-2 text-sm text-green-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <select
            value={participanteId ?? ''}
            onChange={e => setParticipanteId(Number(e.target.value) || undefined)}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Selecione o participante</option>
            {participantes.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <select
            value={atividadeId ?? ''}
            onChange={e => setAtividadeId(Number(e.target.value) || undefined)}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Selecione a atividade</option>
            {atividades.map(a => (
              <option key={a.id} value={a.id}>
                {a.nome} {a.data ? `- ${new Date(a.data).toLocaleDateString()}` : ''}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrar Presença
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Presenças Registradas</h2>
        {presencas.length === 0 ? (
          <p>Nenhuma presença registrada.</p>
        ) : (
          <ul className="space-y-4">
            {presencas.map(p => (
              <li key={p.id} className="border rounded p-4 shadow flex flex-col gap-1">
                <p>
                  <strong>Participante:</strong>{' '}
                  {p.participantes?.nome ?? '—'}
                </p>
                <p>
                  <strong>Atividade:</strong>{' '}
                  {p.atividades?.nome ?? '—'}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {p.data ? new Date(p.data).toLocaleDateString() : '—'}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => {
            window.open('/api/relatorio-presencas', '_blank')
          }}
          className="mt-8 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mb-6"
        >
          Baixar Relatório de Presenças (PDF)
        </button>

        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-blue-600 hover:underline">
            ← Voltar à tela principal
          </a>
        </div>
      </main>
    </Layout>
  )
}

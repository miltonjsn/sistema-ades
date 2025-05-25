'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'

interface Projeto {
  id: number
  nome: string
}

interface Atividade {
  id: number
  nome: string
  descricao: string
  data: string
  projetos?: {    // alteração aqui: plural e opcional
    nome: string
  }
}

export default function CadastroAtividade() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [projetoId, setProjetoId] = useState<number | null>(null)
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchProjetos()
    fetchAtividades()
  }, [])

  async function fetchProjetos() {
    try {
      const res = await fetch('/api/projetos')
      const data = await res.json()
      setProjetos(data)
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
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

    if (!projetoId) {
      setMsg('Selecione um projeto.')
      return
    }

    const res = await fetch('/api/atividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        descricao,
        data,
        projetoId,
      }),
    })

    if (res.ok) {
      setMsg('Atividade criada com sucesso!')
      setNome('')
      setDescricao('')
      setData('')
      setProjetoId(null)
      fetchAtividades()
    } else {
      setMsg('Erro ao criar atividade.')
    }
  }

  return (
    <Layout>
      <main className="max-w-2xl mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Atividade</h1>
        {msg && <p className="mb-2 text-sm text-green-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Nome da atividade"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            className="border rounded px-3 py-2"
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            required
            className="border rounded px-3 py-2"
          />
          <select
            value={projetoId ?? ''}
            onChange={e => setProjetoId(Number(e.target.value))}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">Selecione um projeto</option>
            {projetos.map(proj => (
              <option key={proj.id} value={proj.id}>
                {proj.nome}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Atividades Cadastradas</h2>
        {atividades.length === 0 ? (
          <p>Nenhuma atividade encontrada.</p>
        ) : (
          <ul className="space-y-4">
            {atividades.map(atividade => (
              <li key={atividade.id} className="border rounded p-4 shadow">
                <h3 className="text-lg font-semibold">{atividade.nome}</h3>
                <p className="text-gray-600">{atividade.descricao}</p>
                <p className="text-sm text-gray-500">
                  Data: {new Date(atividade.data).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Projeto: {atividade.projetos?.nome ?? 'Não informado'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Botão de voltar fixo no rodapé */}
      <footer className="text-center mt-8 mb-4">
        <Link href="/">
          <span className="text-blue-600 hover:underline text-sm">
            ← Voltar à tela principal
          </span>
        </Link>
      </footer>
    </Layout>
  )
}

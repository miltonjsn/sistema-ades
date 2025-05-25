'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'

interface Projeto {
  id: number
  nome: string
}

export default function CadastroAtividade() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [projetoId, setProjetoId] = useState<number | null>(null)
  const [msg, setMsg] = useState('')

  // Buscar lista de projetos para seleção
  useEffect(() => {
    fetch('/api/projetos')
      .then(res => res.json())
      .then(data => setProjetos(data))
      .catch(() => setProjetos([]))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projetoId) {
      setMsg('Selecione um projeto')
      return
    }

    const res = await fetch('/api/atividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, data, projetoId }),
    })

    if (res.ok) {
      setMsg('Atividade criada com sucesso!')
      setNome('')
      setDescricao('')
      setData('')
      setProjetoId(null)
    } else {
      setMsg('Erro ao criar atividade.')
    }
  }

  return (
    <Layout>
      <main className="max-w-md mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Atividade</h1>
        {msg && <p className="mb-4 text-sm text-green-700">{msg}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da atividade"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <select
            value={projetoId ?? ''}
            onChange={e => setProjetoId(Number(e.target.value))}
            className="border rounded px-3 py-2"
            required
          >
            <option value="" disabled>
              Selecione um projeto
            </option>
            {projetos.map(proj => (
              <option key={proj.id} value={proj.id}>
                {proj.nome}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </form>
      </main>

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

'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

export default function CadastroProjeto() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    fetchProjetos()
  }, [])

  async function fetchProjetos() {
    try {
      const res = await fetch('/api/projetos')
      if (!res.ok) throw new Error('Erro ao buscar projetos')
      const data = await res.json()
      setProjetos(data)
    } catch (error) {
      console.error(error)
      setErro('Erro ao carregar projetos.')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setErro('')

    try {
      const res = await fetch('/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao }),
      })

      if (!res.ok) throw new Error('Erro ao criar projeto.')

      setMsg('✅ Projeto criado com sucesso!')
      setNome('')
      setDescricao('')
      fetchProjetos()

      setTimeout(() => setMsg(''), 3000)
    } catch (error) {
      console.error(error)
      setErro('❌ Erro ao criar projeto.')
      setTimeout(() => setErro(''), 3000)
    }
  }

  return (
    <Layout>
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Cadastro de Projeto</h1>

        {msg && <p className="mb-3 text-green-600">{msg}</p>}
        {erro && <p className="mb-3 text-red-600">{erro}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border rounded p-4 shadow"
        >
          <div>
            <label className="block mb-1 font-medium">Nome do Projeto</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Descrição</label>
            <textarea
              placeholder="Digite a descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Salvar Projeto
          </button>
        </form>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Projetos Cadastrados</h2>

        <ul className="space-y-3 mb-10">
          {projetos.map((projeto: any) => (
            <li
              key={projeto.id}
              className="border p-3 rounded shadow-sm hover:shadow-md"
            >
              <strong className="text-lg">{projeto.nome}</strong>
              <p className="text-sm text-gray-600">{projeto.descricao}</p>
              <p className="text-xs text-gray-400">
                Criado em:{' '}
                {new Date(projeto.criadoEm).toLocaleDateString('pt-BR')}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Voltar à tela principal
          </a>
        </div>
      </main>
    </Layout>
  )
}

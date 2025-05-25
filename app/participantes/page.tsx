'use client'

import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'

interface Participante {
  id: number
  nome: string
  email?: string | null
  telefone?: string | null
  cpf?: string | null
  data_nascimento?: string | null
}

export default function CadastroParticipante() {
  const [participantes, setParticipantes] = useState<Participante[]>([])

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')

  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchParticipantes()
  }, [])

  async function fetchParticipantes() {
    try {
      const res = await fetch('/api/participantes')
      const data = await res.json()

      console.log('Resposta da API /api/participantes:', data)

      if (Array.isArray(data)) {
        setParticipantes(data)
      } else {
        setMsg('Erro ao carregar participantes')
      }
    } catch (error) {
      console.error('Erro ao buscar participantes:', error)
      setMsg('Erro ao buscar participantes')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nome) {
      setMsg('Preencha o nome do participante')
      return
    }

    const res = await fetch('/api/participantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email: email || null,
        telefone: telefone || null,
        cpf: cpf || null,
        data_nascimento: dataNascimento || null,
      }),
    })

    if (res.ok) {
      setMsg('Participante cadastrado com sucesso!')
      setNome('')
      setEmail('')
      setTelefone('')
      setCpf('')
      setDataNascimento('')
      fetchParticipantes()
    } else {
      setMsg('Erro ao cadastrar participante.')
    }
  }

  return (
    <Layout>
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Participante</h1>
        {msg && <p className="mb-2 text-sm text-green-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Nome*"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            className="border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            placeholder="Data de nascimento"
            value={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Cadastrar Participante
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Participantes Cadastrados</h2>
        {participantes.length === 0 ? (
          <p>Nenhum participante cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {participantes.map(p => (
              <li
                key={p.id}
                className="border rounded p-4 shadow flex flex-col gap-1"
              >
                <p><strong>Nome:</strong> {p.nome}</p>
                {p.email && <p><strong>Email:</strong> {p.email}</p>}
                {p.telefone && <p><strong>Telefone:</strong> {p.telefone}</p>}
                {p.cpf && <p><strong>CPF:</strong> {p.cpf}</p>}
                {p.data_nascimento && (
                  <p><strong>Nascimento:</strong> {new Date(p.data_nascimento).toLocaleDateString()}</p>
                )}
              </li>
            ))}
          </ul>
        )}
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

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Cria um novo participante
export async function POST(req: Request) {
  try {
    const data = await req.json()

    const novoParticipante = await prisma.participantes.create({
      data: {
        nome: data.nome,
        email: data.email ?? null,
        telefone: data.telefone ?? null,
        cpf: data.cpf ?? null,
        data_nascimento: data.data_nascimento
          ? new Date(data.data_nascimento)
          : null,
      },
    })

    return NextResponse.json(novoParticipante, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar participante:', error)
    return NextResponse.json(
      { error: 'Erro ao criar participante' },
      { status: 500 }
    )
  }
}

// Lista todos os participantes
export async function GET() {
  try {
    const participantes = await prisma.participantes.findMany({
      orderBy: { id: 'asc' },
    })

    return NextResponse.json(participantes)
  } catch (error) {
    console.error('Erro ao buscar participantes:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar participantes' },
      { status: 500 }
    )
  }
}

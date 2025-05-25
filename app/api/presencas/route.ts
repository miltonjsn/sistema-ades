import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Cria uma nova presença
export async function POST(req: Request) {
  try {
    const data = await req.json()

    const novaPresenca = await prisma.presencas.create({
      data: {
        participante_id: data.participante_id,
        atividade_id: data.atividade_id,
        data: data.data ? new Date(data.data) : new Date(),
      },
    })

    return NextResponse.json(novaPresenca, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar presença:', error)
    return NextResponse.json(
      { error: 'Erro ao criar presença' },
      { status: 500 }
    )
  }
}

// Lista todas as presenças com dados do participante e atividade
export async function GET() {
  try {
    const presencas = await prisma.presencas.findMany({
      include: {
        participantes: true, // inclui dados do participante
        atividades: true,    // inclui dados da atividade
      },
      orderBy: { id: 'asc' },
    })

    return NextResponse.json(presencas)
  } catch (error) {
    console.error('Erro ao buscar presenças:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar presenças' },
      { status: 500 }
    )
  }
}

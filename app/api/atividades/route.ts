import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validação simples da data
    const atividadeData = new Date(data.data)
    if (isNaN(atividadeData.getTime())) {
      return NextResponse.json({ error: 'Data inválida' }, { status: 400 })
    }

    const novaAtividade = await prisma.atividades.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        data: atividadeData,
        projeto_id: data.projetoId,
      },
    })

    return NextResponse.json(novaAtividade, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar atividade:', error)
    return NextResponse.json({ error: 'Erro ao criar atividade' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const atividades = await prisma.atividades.findMany({
      include: {
        projetos: true,  // plural e correto, garante o carregamento do projeto
      },
      orderBy: {
        data: 'desc',
      },
    })

    return NextResponse.json(atividades)
  } catch (error) {
    console.error('Erro ao buscar atividades:', error)
    return NextResponse.json({ error: 'Erro ao buscar atividades' }, { status: 500 })
  }
}

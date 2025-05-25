import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const novoProjeto = await prisma.projetos.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
      },
    })

    return NextResponse.json(novoProjeto, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const projetos = await prisma.projetos.findMany({
      orderBy: { id: 'desc' }, // substituí `criadoEm` por `id` já que não existe campo criadoEm no schema
    })
    return NextResponse.json(projetos)
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return NextResponse.json({ error: 'Erro ao buscar projetos' }, { status: 500 })
  }
}

// Atualizar projeto pelo método PUT (espera JSON com id, nome e descricao)
export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const { id, nome, descricao } = data

    if (!id || !nome) {
      return NextResponse.json({ error: 'ID e nome são obrigatórios' }, { status: 400 })
    }

    const projetoAtualizado = await prisma.projetos.update({
      where: { id },
      data: { nome, descricao },
    })

    return NextResponse.json(projetoAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error)
    return NextResponse.json({ error: 'Erro ao atualizar projeto' }, { status: 500 })
  }
}

// Apagar projeto pelo método DELETE (espera JSON com id)
export async function DELETE(req: Request) {
  try {
    const data = await req.json()
    const { id } = data

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
    }

    await prisma.projetos.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Projeto deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar projeto:', error)
    return NextResponse.json({ error: 'Erro ao deletar projeto' }, { status: 500 })
  }
}

const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();

  try {
    const projeto = await prisma.projeto.create({
      data: {
        nome: 'Projeto Teste',
        descricao: 'Descrição do projeto teste',
      },
    });
    console.log('Projeto criado:', projeto);

    const atividade = await prisma.atividade.create({
      data: {
        nome: 'Atividade Teste',
        descricao: 'Descrição da atividade teste',
        data: new Date(),
        projetoId: projeto.id,
      },
    });
    console.log('Atividade criada:', atividade);

    const participante = await prisma.participante.create({
      data: {
        nome: 'Participante Teste',
        email: 'teste@exemplo.com',
      },
    });
    console.log('Participante criado:', participante);

    const presenca = await prisma.presenca.create({
      data: {
        participanteId: participante.id,
        atividadeId: atividade.id,
      },
    });
    console.log('Presença criada:', presenca);
  } catch (error) {
    console.error('Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

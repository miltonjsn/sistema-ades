import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import PdfPrinter from 'pdfmake'
import path from 'path'

// Define fontes
const fonts = {
  Roboto: {
    normal: path.resolve('./public/fonts/Roboto-Regular.ttf'),
    bold: path.resolve('./public/fonts/Roboto-Medium.ttf'),
    italics: path.resolve('./public/fonts/Roboto-Italic.ttf'),
    bolditalics: path.resolve('./public/fonts/Roboto-MediumItalic.ttf'),
  },
}

const printer = new PdfPrinter(fonts)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const presencas = await prisma.presencas.findMany({
      include: {
        participantes: true,
        atividades: true,
      },
      orderBy: { data: 'asc' },
    })

    const body = [
      [{ text: 'Participante', bold: true },
       { text: 'Atividade', bold: true },
       { text: 'Data', bold: true }]
    ]

    presencas.forEach(p => {
      body.push([
        p.participantes?.nome || '',
        p.atividades?.nome || '',
        p.data ? new Date(p.data).toLocaleDateString() : ''
      ])
    })

    const docDefinition = {
      content: [
        { text: 'Relatório de Presenças', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body,
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, marginBottom: 10 },
        tableExample: { margin: [0, 5, 0, 15] },
      },
      defaultStyle: { font: 'Roboto' },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const chunks: Uint8Array[] = []
    pdfDoc.on('data', chunk => chunks.push(chunk))
    pdfDoc.end()

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
      pdfDoc.on('error', reject)
    })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-presencas.pdf')
    res.send(buffer)
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    res.status(500).json({ error: 'Erro ao gerar PDF' })
  }
}

import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <main className="max-w-2xl mx-auto p-4 pb-20 text-center space-y-6">
        <h2 className="text-2xl font-bold">Bem-vindo ao Sistema</h2>
        <p className="text-base">
          Escolha abaixo uma ação para gerenciar os projetos, atividades e presenças.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/projetos"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow text-base font-medium"
          >
            Projetos
          </a>
          <a
            href="/atividades"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow text-base font-medium"
          >
            Atividades
          </a>
          <a
            href="/participantes"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded shadow text-base font-medium"
          >
            Participantes
          </a>
          <a
            href="/presencas"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded shadow text-base font-medium"
          >
            Presenças
          </a>
        </div>
      </main>
    </Layout>
  )
}

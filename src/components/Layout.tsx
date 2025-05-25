'use client'

import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(16)

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24))
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12))

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Cabeçalho */}
      <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
          Agência de Desenvolvimento Econômico Social<br />
          <span className="text-sm md:text-base font-normal">
            Sistema de Monitoramento de Projetos
          </span>
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main
        style={{ fontSize }}
        className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto w-full transition-all"
      >
        {children}
      </main>

      {/* Botões de acessibilidade */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button
          onClick={decreaseFont}
          className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm shadow hover:bg-gray-100"
        >
          A-
        </button>
        <button
          onClick={increaseFont}
          className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm shadow hover:bg-gray-100"
        >
          A+
        </button>
      </div>

      {/* Rodapé */}
      <footer className="bg-blue-900 text-white text-center py-2 text-sm">
        © {new Date().getFullYear()} ADES. Todos os direitos reservados.
      </footer>
    </div>
  )
}

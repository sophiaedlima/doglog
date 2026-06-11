import React, { useState, useEffect, useMemo } from 'react'
import DashboardSection from './components/Dashboard/DashboardSection'
import CachorrosSection from './components/Cachorros/CachorrosSection'
import AtividadesSection from './components/Atividades/AtividadesSection'
import LoginPage from './components/Login/LoginPage'
import type { IAtividade, ILoginCredenciais, IDashboardStats } from './types'
import { login, getAtividades, createAtividade, deleteAtividade } from './services/api'
import './index.css'

const ATIVIDADES_MOCK: IAtividade[] = []

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [erroLogin, setErroLogin] = useState<string | null>(null)
  const [atividades, setAtividades] = useState<IAtividade[]>(ATIVIDADES_MOCK)

  useEffect(() => {
    if (!token) return
    getAtividades()
      .then((dados) => setAtividades(dados))
      .catch(() => {
        console.warn('Backend indisponível, usando dados mock.')
      })
  }, [token])

  const dashboardStats = useMemo<IDashboardStats>(() => {
    const hoje = new Date().toISOString().split('T')[0]
    const atividadesHoje = atividades.filter((a) => a.horario.startsWith(hoje))
    return {
      totalAtividades: atividades.length,
      racoesHoje: atividadesHoje.filter((a) => a.tipo === 'RACAO').length,
      passeiosHoje: atividadesHoje.filter((a) => a.tipo === 'PASSEIO').length,
      petiscosHoje: atividadesHoje.filter((a) => a.tipo === 'PETISCO').length,
    }
  }, [atividades])

  const handleLogin = async (credenciais: ILoginCredenciais) => {
  try {
    const { token: novoToken } = await login(credenciais)
    localStorage.setItem('token', novoToken)
    setToken(novoToken)
    setErroLogin(null)
  } catch {
    setErroLogin('Usuário ou senha inválidos. Tente novamente.')
  }
}

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setAtividades([])
  }

  const handleNovaAtividade = async (novaAtividade: Omit<IAtividade, 'id'>) => {
    try {
      const criada = await createAtividade(novaAtividade)
      setAtividades((prev) => [...prev, criada])
    } catch {
      const atividadeLocal: IAtividade = {
        ...novaAtividade,
        id: Date.now(),
      }
      setAtividades((prev) => [...prev, atividadeLocal])
    }
  }

  const handleDeletarAtividade = async (id: number) => {
    try {
      await deleteAtividade(id)
    } catch {
      console.warn('Falha ao deletar no backend, removendo localmente.')
    }
    setAtividades((prev) => prev.filter((a) => a.id !== id))
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} erro={erroLogin} />
  }

  return (
    <>
      {/* Navbar simples só com nome e botão sair */}
      <header>
        <nav className="navbar navbar-doglog px-4">
          <span className="navbar-brand">
            🐾 DogLog
          </span>
          <button
            className="btn btn-sm btn-outline-light ms-auto"
            onClick={handleLogout}
          >
            Sair
          </button>
        </nav>
      </header>

      {/* Conteúdo único: tudo em uma página só */}
      <main className="container-fluid px-4 py-4">

        {/* Cards do dashboard */}
        <DashboardSection stats={dashboardStats} />

        {/* Cards dos cachorros */}
        <div className="mt-4">
          <CachorrosSection atividades={atividades} />
        </div>

        {/* Tabela de atividades */}
        <div className="mt-4">
          <AtividadesSection
            atividades={atividades}
            onNovaAtividade={handleNovaAtividade}
            onDeletar={handleDeletarAtividade}
          />
        </div>

      </main>

      {/* Footer com identificação */}
      <footer>
        <address style={{ fontStyle: 'normal' }} className="mb-0">
          <strong>DogLog</strong> - Sistema de Registro de Atividades de Pets |
          Sophia Eduarda Lima |
          Junho de 2026 |
          Desenvolvimento de Software Web - Prof. Alexandre Almeida - PUC Goiás
        </address>
      </footer>
    </>
  )
}

export default App
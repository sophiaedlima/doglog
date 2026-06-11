// ===================================================
// COMPONENTE: LoginPage
//
// Tela de autenticação do sistema.
// Exibe um formulário de usuário e senha.
//
// Não faz a chamada HTTP diretamente: recebe a função
// onLogin via props. Quem chama a API é o App.tsx.
// Isso mantém o componente focado apenas na interface.
// ===================================================

import React, { useState } from 'react'
import type { ILoginCredenciais } from '../../types'

interface ILoginPageProps {
  onLogin: (credenciais: ILoginCredenciais) => Promise<void>
  erro: string | null
}

const LoginPage: React.FC<ILoginPageProps> = ({ onLogin, erro }) => {

  const [credenciais, setCredenciais] = useState<ILoginCredenciais>({
    username: '',
    password: '',
  })

  // Controla o botão de loading enquanto aguarda resposta do backend
  const [carregando, setCarregando] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredenciais((prev) => ({ ...prev, [name]: value }))
  }

  // O evento de submit vem do formulário, não do botão.
  // Isso permite que o usuário pressione Enter para logar.
  const handleSubmit = async (e: React.FormEvent) => {
    // Previne o comportamento padrão do formulário,
    // que seria recarregar a página ao submeter
    e.preventDefault()
    setCarregando(true)
    await onLogin(credenciais)
    setCarregando(false)
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Logo e título */}
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🐾</div>
          <h1 className="brand-titulo mt-1">DogLog</h1>
          <p className="text-muted small">
            Registro de atividades da Amora, Lilica e Snoopy
          </p>
        </div>

        {/* Mensagem de erro vinda do App.tsx */}
        {erro && (
          <div className="alert alert-danger py-2 small">
            <i className="bi bi-exclamation-triangle me-1"></i>
            {erro}
          </div>
        )}

        {/* Formulário de login */}
        {/* onSubmit no form captura tanto o clique no botão
            quanto o Enter pressionado em qualquer campo */}
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Usuário</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={credenciais.username}
              onChange={handleChange}
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Senha</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credenciais.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-doglog w-100"
            disabled={carregando}
          >
            {/* Exibe spinner enquanto aguarda resposta */}
            {carregando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Entrando...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Entrar
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  )
}

export default LoginPage
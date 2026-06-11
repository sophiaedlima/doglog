// ===================================================
// COMPONENTE: Navbar
//
// Barra de navegação superior da aplicação.
// Exibe o nome do sistema e o botão de logout.
//
// Recebe uma prop: onLogout, que é uma função executada
// quando o usuário clica em "Sair". Quem define o que
// acontece no logout é o componente pai (App.tsx),
// não o Navbar. Isso mantém o Navbar simples e reutilizável.
// ===================================================

import React from 'react'

// Definição das props que esse componente aceita
interface INavbarProps {
  onLogout: () => void   // uma função que não recebe parâmetros e não retorna nada
}

// React.FC significa "React Function Component"
// O <INavbarProps> entre os <> diz ao TypeScript qual é o tipo das props
const Navbar: React.FC<INavbarProps> = ({ onLogout }) => {
  return (
    // A tag <header> é exigida pelo professor (semântica HTML5)
    <header>
      <nav className="navbar navbar-doglog navbar-expand-lg px-3">

        {/* Nome e ícone do sistema, no lado esquerdo */}
        <a className="navbar-brand" href="#">
          <i className="bi bi-patch-heart-fill me-2"></i>
          DogLog
        </a>

        {/* Lado direito: nome do usuário e botão de sair */}
        <div className="ms-auto d-flex align-items-center gap-3">

          {/* d-none d-md-inline: esconde em celular, mostra a partir do tablet */}
          <span className="text-white-50 small d-none d-md-inline">
            <i className="bi bi-person-circle me-1"></i>
            Admin
          </span>

          <button
            className="btn btn-sm btn-outline-light"
            onClick={onLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Sair
          </button>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
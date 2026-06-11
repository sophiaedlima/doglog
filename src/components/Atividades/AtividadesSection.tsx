// ===================================================
// COMPONENTE: AtividadesSection
//
// Tabela completa de atividades registradas.
// Permite filtrar por cachorro e por tipo de atividade.
// Tem o botão para abrir o modal de nova atividade.
//
// O estado do filtro é local (só interessa a essa seção).
// O estado das atividades fica no App.tsx, pois o
// Dashboard também precisa dessas informações.
// ===================================================

import React, { useState } from 'react'
import type { IAtividade, TipoAtividade } from '../../types'
import { CACHORROS_FIXOS, LABELS_ATIVIDADE, CORES_ATIVIDADE } from '../../types'
import ModalNovaAtividade from '../Modal/ModalNovaAtividade'

interface IAtividadesSectionProps {
  atividades: IAtividade[]
  onNovaAtividade: (atividade: Omit<IAtividade, 'id'>) => void
  onDeletar: (id: number) => void
}

const AtividadesSection: React.FC<IAtividadesSectionProps> = ({
  atividades,
  onNovaAtividade,
  onDeletar,
}) => {

  // Estado local: controla se o modal está aberto ou fechado
  const [modalAberto, setModalAberto] = useState(false)

  // Estado local: filtros da tabela
  // 'todos' é o valor padrão, significa sem filtro ativo
  const [filtroCachorro, setFiltroCachorro] = useState<number | 'todos'>('todos')
  const [filtroTipo, setFiltroTipo] = useState<TipoAtividade | 'todos'>('todos')

  // Aplica os filtros sobre a lista de atividades.
  // O .filter() retorna um novo array sem modificar o original.
  const atividadesFiltradas = atividades.filter((a) => {
    const passaCachorro = filtroCachorro === 'todos' || a.cachorroId === filtroCachorro
    const passaTipo = filtroTipo === 'todos' || a.tipo === filtroTipo
    return passaCachorro && passaTipo
  })

  // Ordena as atividades filtradas da mais recente para a mais antiga
  const atividadesOrdenadas = [...atividadesFiltradas].sort(
    (a, b) => new Date(b.horario).getTime() - new Date(a.horario).getTime()
  )

  // Formata horário ISO para exibição legível
  const formatarHorario = (horario: string): string => {
  return new Date(horario).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  })
}

  // Chamada quando o usuário salva uma nova atividade no modal
  const handleSalvar = (atividade: Omit<IAtividade, 'id'>) => {
    onNovaAtividade(atividade)
    setModalAberto(false)
  }

  // Pede confirmação antes de deletar
  const handleDeletar = (id: number) => {
    if (window.confirm('Deseja realmente remover essa atividade?')) {
      onDeletar(id)
    }
  }

  return (
    <section>

      {/* Cabeçalho da seção com título e botão de nova atividade */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="titulo-secao mb-0">
          <i className="bi bi-clock-history me-2"></i>
          Atividades
        </h2>
        <button
          className="btn btn-doglog"
          onClick={() => setModalAberto(true)}
        >
          <i className="bi bi-plus-lg me-1"></i>
          Nova Atividade
        </button>
      </div>

      {/* ================================================
          FILTROS
          Ficam acima da tabela. Permitem refinar a lista
          sem sair da página.
          ================================================ */}
      <div className="row g-2 mb-3">

        {/* Filtro por cachorro */}
        <div className="col-12 col-sm-6 col-md-4">
          <select
            className="form-select form-select-sm"
            value={filtroCachorro}
            onChange={(e) => {
              const val = e.target.value
              setFiltroCachorro(val === 'todos' ? 'todos' : Number(val))
            }}
          >
            <option value="todos">Todos os cachorros</option>
            {CACHORROS_FIXOS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por tipo de atividade */}
        <div className="col-12 col-sm-6 col-md-4">
          <select
            className="form-select form-select-sm"
            value={filtroTipo}
            onChange={(e) => {
              const val = e.target.value
              setFiltroTipo(val === 'todos' ? 'todos' : val as TipoAtividade)
            }}
          >
            <option value="todos">Todos os tipos</option>
            {(Object.keys(LABELS_ATIVIDADE) as Array<TipoAtividade>).map((tipo) => (
              <option key={tipo} value={tipo}>
                {LABELS_ATIVIDADE[tipo]}
              </option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        <div className="col-12 col-md-4 d-flex align-items-center">
          <span className="text-muted small">
            {atividadesOrdenadas.length} registro(s) encontrado(s)
          </span>
        </div>

      </div>

      {/* ================================================
          TABELA DE ATIVIDADES
          ================================================ */}
      <div className="table-responsive">
        <table className="table tabela-doglog table-hover align-middle">
          <thead>
            <tr>
              <th>Cachorro</th>
              <th>Tipo</th>
              <th>Horário</th>
              <th>Observação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>

            {/* Caso não haja atividades após o filtro */}
            {atividadesOrdenadas.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Nenhuma atividade encontrada.
                </td>
              </tr>
            )}

            {/* Renderiza uma linha por atividade */}
            {atividadesOrdenadas.map((atividade) => (
              <tr key={atividade.id}>

                {/* Nome do cachorro */}
                <td className="fw-semibold">
                  🐶 {atividade.cachorroNome}
                </td>

                {/* Badge colorido com o tipo */}
                <td>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: CORES_ATIVIDADE[atividade.tipo],
                      fontSize: '0.8rem',
                      padding: '5px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {LABELS_ATIVIDADE[atividade.tipo]}
                  </span>
                </td>

                {/* Horário formatado */}
                <td className="text-muted small">
                  <i className="bi bi-clock me-1"></i>
                  {formatarHorario(atividade.horario)}
                </td>

                {/* Observação, se houver */}
                <td className="text-muted small fst-italic">
                  {atividade.observacao || '—'}
                </td>

                {/* Botão de deletar */}
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeletar(atividade.id)}
                    title="Remover atividade"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Modal: só renderiza quando modalAberto for true */}
      {modalAberto && (
        <ModalNovaAtividade
          onSalvar={handleSalvar}
          onFechar={() => setModalAberto(false)}
        />
      )}

    </section>
  )
}

export default AtividadesSection
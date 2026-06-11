// ===================================================
// COMPONENTE: DashboardSection
//
// Seção completa do Dashboard. Recebe os dados
// calculados pelo App.tsx e distribui para cada
// DashboardCard individual.
//
// Os contadores são derivados do estado de atividades
// do App.tsx via useMemo, então atualizam automaticamente
// toda vez que uma atividade é adicionada ou removida.
// ===================================================

import React from 'react'
import DashboardCard from './DashboardCard'
import type { IDashboardStats } from '../../types'

interface IDashboardSectionProps {
  stats: IDashboardStats
}

const DashboardSection: React.FC<IDashboardSectionProps> = ({ stats }) => {
  return (
    <section>

      <h2 className="titulo-secao">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </h2>

      <div className="row g-3">

        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            label="Total de Atividades"
            value={stats.totalAtividades}
            icon="bi-clock-history"
            cor="#5b4fcf"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            label="Rações Hoje"
            value={stats.racoesHoje}
            icon="bi-cup-hot-fill"
            cor="#059669"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            label="Passeios Hoje"
            value={stats.passeiosHoje}
            icon="bi-geo-alt-fill"
            cor="#2563eb"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            label="Petiscos Hoje"
            value={stats.petiscosHoje}
            icon="bi-award-fill"
            cor="#d97706"
          />
        </div>

      </div>
    </section>
  )
}

export default DashboardSection
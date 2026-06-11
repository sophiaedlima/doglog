import React from 'react'
import type { IDashboardCardProps } from '../../types'

const DashboardCard: React.FC<IDashboardCardProps> = ({ label, value, cor }) => {
  const corFinal = cor ?? 'var(--cor-primaria)'

  return (
    <div className="stat-card" style={{ borderLeftColor: corFinal }}>
      <div className="stat-valor" style={{ color: corFinal }}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default DashboardCard
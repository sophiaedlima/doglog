// ===================================================
// COMPONENTE: CachorrosSection
//
// Exibe os três cachorros fixos do sistema em cards.
// Abaixo de cada cachorro mostra a última atividade
// registrada para ele, se houver.
//
// É um componente puramente visual: não tem estado
// próprio, não faz chamadas HTTP. Recebe tudo via props.
// ===================================================

import React from 'react'
import type { IAtividade } from '../../types'
import { CACHORROS_FIXOS, LABELS_ATIVIDADE, CORES_ATIVIDADE } from '../../types'

interface ICachorrosSectionProps {
  atividades: IAtividade[]  // lista completa de atividades, vinda do App.tsx
}

const CachorrosSection: React.FC<ICachorrosSectionProps> = ({ atividades }) => {

  // Para cada cachorro, encontra a atividade mais recente.
  // O .filter() seleciona apenas as atividades daquele cachorro.
  // O .sort() ordena por horário, do mais recente para o mais antigo.
  // O [0] pega o primeiro item, que é o mais recente.
  const ultimaAtividade = (cachorroId: number): IAtividade | undefined => {
    return atividades
      .filter((a) => a.cachorroId === cachorroId)
      .sort((a, b) => new Date(b.horario).getTime() - new Date(a.horario).getTime())[0]
  }

  // Formata o horário ISO para exibição legível
  // Ex: "2025-06-08T14:30" vira "08/06/2025 às 14:30"
  const formatarHorario = (horario: string): string => {
    return new Date(horario).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section>

      <h2 className="titulo-secao">
        <i className="bi bi-heart-fill me-2"></i>
        Cachorros
      </h2>

      <div className="row g-4">
        {CACHORROS_FIXOS.map((cachorro) => {
          const ultima = ultimaAtividade(cachorro.id)

          return (
            <div key={cachorro.id} className="col-12 col-md-4">
              <div className="stat-card h-100" style={{ borderLeftColor: 'var(--cor-primaria)' }}>

                {/* Nome do cachorro */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ fontSize: '2rem' }}>🐶</span>
                  <h4 className="mb-0" style={{ color: 'var(--cor-primaria)' }}>
                    {cachorro.nome}
                  </h4>
                </div>

                {/* Última atividade registrada */}
                <div>
                  <p className="stat-label mb-1">Última atividade</p>

                  {ultima ? (
                    // Se houver atividade, exibe tipo, horário e observação
                    <div>
                      <span
                        className="badge mb-1"
                        style={{
                          backgroundColor: CORES_ATIVIDADE[ultima.tipo],
                          fontSize: '0.85rem',
                          padding: '5px 10px',
                          borderRadius: '20px',
                        }}
                      >
                        {LABELS_ATIVIDADE[ultima.tipo]}
                      </span>
                      <p className="small text-muted mb-1">
                        <i className="bi bi-clock me-1"></i>
                        {formatarHorario(ultima.horario)}
                      </p>
                      {ultima.observacao && (
                        <p className="small text-muted mb-0 fst-italic">
                          "{ultima.observacao}"
                        </p>
                      )}
                    </div>
                  ) : (
                    // Se não houver atividade ainda
                    <p className="small text-muted mb-0">
                      Nenhuma atividade registrada ainda.
                    </p>
                  )}
                </div>

              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default CachorrosSection
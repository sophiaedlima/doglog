// ===================================================
// COMPONENTE: ModalNovaAtividade
//
// Formulário para registrar uma atividade.
// Os cachorros são importados diretamente das constantes
// fixas do sistema, sem precisar receber via props.
// ===================================================

import React, { useState } from 'react'
import type { IModalAtividadeProps, IAtividade } from '../../types'
import { CACHORROS_FIXOS, LABELS_ATIVIDADE } from '../../types'

const ModalNovaAtividade: React.FC<IModalAtividadeProps> = ({ onSalvar, onFechar }) => {

  // Horário atual formatado para o input datetime-local
  const horarioInicial = new Date().toISOString().slice(0, 16)

  const [formData, setFormData] = useState<Omit<IAtividade, 'id'>>({
    tipo: 'RACAO',
    horario: horarioInicial,
    observacao: '',
    cachorroId: CACHORROS_FIXOS[0].id,
    cachorroNome: CACHORROS_FIXOS[0].nome,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Atualiza cachorroId e cachorroNome juntos ao trocar o select
  const handleCachorroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelecionado = Number(e.target.value)
    const cachorro = CACHORROS_FIXOS.find((c) => c.id === idSelecionado)
    setFormData((prev) => ({
      ...prev,
      cachorroId: idSelecionado,
      cachorroNome: cachorro?.nome ?? '',
    }))
  }

  const handleSubmit = () => {
    if (!formData.horario) {
      alert('Informe o horário da atividade.')
      return
    }
    onSalvar(formData)
  }

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header" style={{ backgroundColor: 'var(--cor-primaria)' }}>
            <h5 className="modal-title text-white">
              <i className="bi bi-clock-history me-2"></i>
              Nova Atividade
            </h5>
            <button className="btn-close btn-close-white" onClick={onFechar}></button>
          </div>

          <div className="modal-body">

            {/* Seleção do cachorro entre os três fixos */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Cachorro <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={formData.cachorroId}
                onChange={handleCachorroChange}
              >
                {CACHORROS_FIXOS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo da atividade */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Tipo <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                {/* Percorre o objeto LABELS_ATIVIDADE para gerar as opções */}
                {(Object.keys(LABELS_ATIVIDADE) as Array<keyof typeof LABELS_ATIVIDADE>).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {LABELS_ATIVIDADE[tipo]}
                  </option>
                ))}
              </select>
            </div>

            {/* Horário preenchido com o momento atual */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Horário <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
              />
            </div>

            {/* Observação opcional */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Observação{' '}
                <span className="text-muted fw-normal">(opcional)</span>
              </label>
              <textarea
                className="form-control"
                name="observacao"
                value={formData.observacao}
                onChange={handleChange}
                rows={3}
                placeholder="Ex: Amora comeu tudo, Snoopy estava animado..."
              ></textarea>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onFechar}>
              Cancelar
            </button>
            <button className="btn btn-doglog" onClick={handleSubmit}>
              <i className="bi bi-check-lg me-1"></i>
              Registrar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ModalNovaAtividade
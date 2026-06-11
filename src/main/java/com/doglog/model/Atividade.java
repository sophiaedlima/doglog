package com.doglog.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "atividades")
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAtividade tipo;

    @Column(nullable = false)
    private LocalDateTime horario;

    private String observacao;

    @Column(name = "cachorro_id", nullable = false)
    private Integer cachorroId;

    @Column(name = "cachorro_nome", nullable = false)
    private String cachorroNome;

    public enum TipoAtividade {
        RACAO, PETISCO, PASSEIO, DORMIR
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TipoAtividade getTipo() { return tipo; }
    public void setTipo(TipoAtividade tipo) { this.tipo = tipo; }

    public LocalDateTime getHorario() { return horario; }
    public void setHorario(LocalDateTime horario) { this.horario = horario; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public Integer getCachorroId() { return cachorroId; }
    public void setCachorroId(Integer cachorroId) { this.cachorroId = cachorroId; }

    public String getCachorroNome() { return cachorroNome; }
    public void setCachorroNome(String cachorroNome) { this.cachorroNome = cachorroNome; }
}
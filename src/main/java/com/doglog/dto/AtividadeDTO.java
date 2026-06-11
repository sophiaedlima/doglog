package com.doglog.dto;

import java.time.LocalDateTime;

import com.doglog.model.Atividade.TipoAtividade;

public class AtividadeDTO {

    public static class Request {
        private TipoAtividade tipo;
        private LocalDateTime horario;
        private String observacao;
        private Integer cachorroId;
        private String cachorroNome;

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

    public static class Response {
        private Long id;
        private TipoAtividade tipo;
        private LocalDateTime horario;
        private String observacao;
        private Integer cachorroId;
        private String cachorroNome;

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

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private String username;

        public AuthResponse(String token, String username) {
            this.token = token;
            this.username = username;
        }

        public String getToken() { return token; }
        public String getUsername() { return username; }
    }

    public static class DashboardStats {
        private long totalAtividades;
        private long racoesHoje;
        private long passeiosHoje;
        private long petiscosHoje;

        public long getTotalAtividades() { return totalAtividades; }
        public void setTotalAtividades(long totalAtividades) { this.totalAtividades = totalAtividades; }

        public long getRacoesHoje() { return racoesHoje; }
        public void setRacoesHoje(long racoesHoje) { this.racoesHoje = racoesHoje; }

        public long getPasseiosHoje() { return passeiosHoje; }
        public void setPasseiosHoje(long passeiosHoje) { this.passeiosHoje = passeiosHoje; }

        public long getPetiscosHoje() { return petiscosHoje; }
        public void setPetiscosHoje(long petiscosHoje) { this.petiscosHoje = petiscosHoje; }
    }
}
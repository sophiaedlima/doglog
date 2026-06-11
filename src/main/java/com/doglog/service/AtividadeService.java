package com.doglog.service;

import com.doglog.dto.AtividadeDTO;
import com.doglog.model.Atividade;
import com.doglog.model.Atividade.TipoAtividade;
import com.doglog.repository.AtividadeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

/**
 * Service de Atividade.
 *
 * Responsabilidades:
 * - Converter entre entidade (Atividade) e DTO
 * - Aplicar regras de negócio antes de persistir
 * - Delegar acesso ao banco para o Repository
 *
 * A anotação @Service registra essa classe como um
 * componente Spring, permitindo injetá-la em outros
 * lugares com @Autowired ou via construtor.
 */
@Service
public class AtividadeService {

    // Injeção via construtor: é a forma recomendada pelo Spring.
    // Deixa explícito quais dependências a classe precisa
    // e facilita os testes unitários.
    private final AtividadeRepository repository;

    public AtividadeService(AtividadeRepository repository) {
        this.repository = repository;
    }

    /**
     * Retorna todas as atividades.
     * Se cachorroId for informado, filtra pelo cachorro.
     */
    public List<AtividadeDTO.Response> listarTodas(Integer cachorroId) {
        List<Atividade> atividades;

        if (cachorroId != null) {
            atividades = repository.findByCachorroId(cachorroId);
        } else {
            atividades = repository.findAll();
        }

        // Converte cada entidade para o DTO de resposta
        // usando o método auxiliar toResponse()
        return atividades.stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Cria e salva uma nova atividade.
     * @Transactional garante que se algo falhar,
     * o banco reverte para o estado anterior (rollback).
     */
    @Transactional
    public AtividadeDTO.Response criar(AtividadeDTO.Request request) {
        Atividade atividade = new Atividade();
        atividade.setTipo(request.getTipo());
        atividade.setHorario(
            request.getHorario() != null
                ? request.getHorario()
                : LocalDateTime.now()
        );
        atividade.setObservacao(
            request.getObservacao() != null
                ? request.getObservacao()
                : ""
        );
        atividade.setCachorroId(request.getCachorroId());
        atividade.setCachorroNome(request.getCachorroNome());

        return toResponse(repository.save(atividade));
    }

    /**
     * Remove uma atividade pelo id.
     * Lança exceção se não encontrar, evitando deletar
     * algo que não existe silenciosamente.
     */
    @Transactional
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Atividade não encontrada: " + id);
        }
        repository.deleteById(id);
    }

    /**
     * Calcula os contadores do Dashboard para o dia atual.
     */
    public AtividadeDTO.DashboardStats calcularStats() {
        // Define o intervalo do dia atual: 00:00 até 23:59
        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        LocalDateTime fimDia = LocalDate.now().atTime(LocalTime.MAX);

        AtividadeDTO.DashboardStats stats = new AtividadeDTO.DashboardStats();
        stats.setTotalAtividades(repository.count());
        stats.setRacoesHoje(
            repository.countByTipoAndHorarioBetween(TipoAtividade.RACAO, inicioDia, fimDia)
        );
        stats.setPasseiosHoje(
            repository.countByTipoAndHorarioBetween(TipoAtividade.PASSEIO, inicioDia, fimDia)
        );
        stats.setPetiscosHoje(
            repository.countByTipoAndHorarioBetween(TipoAtividade.PETISCO, inicioDia, fimDia)
        );

        return stats;
    }

    /**
     * Converte uma entidade Atividade para o DTO de resposta.
     * Método privado auxiliar usado internamente no Service.
     * Centralizar a conversão aqui evita duplicação de código.
     */
    private AtividadeDTO.Response toResponse(Atividade atividade) {
        AtividadeDTO.Response dto = new AtividadeDTO.Response();
        dto.setId(atividade.getId());
        dto.setTipo(atividade.getTipo());
        dto.setHorario(atividade.getHorario());
        dto.setObservacao(atividade.getObservacao());
        dto.setCachorroId(atividade.getCachorroId());
        dto.setCachorroNome(atividade.getCachorroNome());
        return dto;
    }
}
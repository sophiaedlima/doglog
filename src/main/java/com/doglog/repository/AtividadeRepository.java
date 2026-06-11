package com.doglog.repository;

import com.doglog.model.Atividade;
import com.doglog.model.Atividade.TipoAtividade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository de Atividade.
 *
 * JpaRepository<Atividade, Long> já fornece gratuitamente:
 * - findAll(): busca todos os registros
 * - findById(id): busca por id
 * - save(entidade): insere ou atualiza
 * - deleteById(id): remove por id
 * - count(): conta registros
 *
 * Os métodos abaixo são derivados: o Spring gera o SQL
 * automaticamente com base no nome do método.
 */
@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, Long> {

    // Busca todas as atividades de um cachorro específico
    // SQL gerado: SELECT * FROM atividades WHERE cachorro_id = ?
    List<Atividade> findByCachorroId(Integer cachorroId);

    // Conta atividades de um tipo dentro de um intervalo de tempo
    // Usado para calcular os contadores do Dashboard do dia atual
    long countByTipoAndHorarioBetween(
        TipoAtividade tipo,
        LocalDateTime inicio,
        LocalDateTime fim
    );

    // Conta todas as atividades dentro de um intervalo de tempo
    long countByHorarioBetween(LocalDateTime inicio, LocalDateTime fim);
}
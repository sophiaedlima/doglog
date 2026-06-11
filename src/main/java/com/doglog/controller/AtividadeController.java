package com.doglog.controller;

import com.doglog.dto.AtividadeDTO;
import com.doglog.service.AtividadeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST de Atividades.
 *
 * Todos os endpoints aqui exigem token JWT válido
 * (configurado no SecurityConfig).
 *
 * Endpoints:
 * GET    /api/atividades           → lista todas
 * GET    /api/atividades?cachorroId=1 → filtra por cachorro
 * POST   /api/atividades           → cria nova
 * DELETE /api/atividades/{id}      → remove por id
 *
 * @RestController combina @Controller + @ResponseBody:
 * os métodos retornam dados (JSON) em vez de views (HTML).
 *
 * @RequestMapping define o prefixo de todas as rotas
 * desse controller.
 */
@RestController
@RequestMapping("/api/atividades")
public class AtividadeController {

    private final AtividadeService atividadeService;

    public AtividadeController(AtividadeService atividadeService) {
        this.atividadeService = atividadeService;
    }

    /**
     * GET /api/atividades
     * GET /api/atividades?cachorroId=2
     *
     * @RequestParam(required = false) significa que o parâmetro
     * é opcional. Se não for enviado, cachorroId será null
     * e o service retornará todas as atividades.
     */
    @GetMapping
    public ResponseEntity<List<AtividadeDTO.Response>> listar(
            @RequestParam(required = false) Integer cachorroId) {

        return ResponseEntity.ok(
                atividadeService.listarTodas(cachorroId)
        );
    }

    /**
     * POST /api/atividades
     *
     * Retorna 201 Created (em vez de 200 OK) porque
     * um recurso novo foi criado. Essa distinção é uma
     * boa prática de design de APIs REST.
     */
    @PostMapping
    public ResponseEntity<AtividadeDTO.Response> criar(
            @RequestBody AtividadeDTO.Request request) {

        AtividadeDTO.Response criada = atividadeService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    /**
     * DELETE /api/atividades/{id}
     *
     * @PathVariable extrai o {id} da URL.
     * Ex: DELETE /api/atividades/5 → id = 5
     *
     * Retorna 204 No Content: a operação funcionou
     * mas não há corpo na resposta (o recurso foi removido).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        atividadeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
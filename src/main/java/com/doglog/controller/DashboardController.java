package com.doglog.controller;

import com.doglog.dto.AtividadeDTO;
import com.doglog.service.AtividadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller do Dashboard.
 *
 * Endpoint:
 * GET /api/dashboard/stats → retorna os contadores do dia
 *
 * Separamos em um controller próprio para deixar claro
 * que esses dados são agregados, não recursos CRUD.
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final AtividadeService atividadeService;

    public DashboardController(AtividadeService atividadeService) {
        this.atividadeService = atividadeService;
    }

    /**
     * GET /api/dashboard/stats
     *
     * Delega o cálculo para o AtividadeService,
     * que já tem acesso ao repository para contar.
     */
    @GetMapping("/stats")
    public ResponseEntity<AtividadeDTO.DashboardStats> getStats() {
        return ResponseEntity.ok(atividadeService.calcularStats());
    }
}
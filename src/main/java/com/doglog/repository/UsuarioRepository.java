package com.doglog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.doglog.model.Usuario;

/**
 * Repository de Usuario.
 *
 * O método findByLogin é usado pelo Spring Security
 * para buscar o usuário no banco durante a autenticação.
 * O Spring Data JPA gera o SQL automaticamente pelo nome do método:
 * SELECT * FROM usuarios WHERE login = ?
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    // Retorna UserDetails (interface do Spring Security)
    // para que o AutorizacaoService possa retornar diretamente
    UserDetails findByLogin(String login);
}
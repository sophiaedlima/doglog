package com.doglog.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidade que representa um usuário do sistema.
 * Implementa UserDetails do Spring Security, que é a interface
 * que o Spring usa para obter as informações do usuário autenticado.
 *
 * A tabela "usuarios" será criada automaticamente pelo Hibernate.
 */
@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // Login único do usuário (equivale ao username)
    @Column(nullable = false, unique = true)
    private String login;

    // Senha já criptografada com BCrypt
    @Column(nullable = false)
    private String senha;

    // Função/papel do usuário no sistema (ex: ADMIN, USER)
    @Column(nullable = false)
    private String funcao;

    // Construtor vazio exigido pelo JPA
    public Usuario() {}

    // Construtor usado ao registrar um novo usuário
    public Usuario(String login, String senha, String funcao) {
        this.login = login;
        this.senha = senha;
        this.funcao = funcao;
    }

    // ===== MÉTODOS DO UserDetails =====
    // O Spring Security chama esses métodos para verificar
    // as permissões e o status da conta do usuário.

    /**
     * Retorna as permissões (roles) do usuário.
     * O Spring usa isso para controlar o acesso a recursos.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + funcao));
    }

    /**
     * Retorna a senha do usuário (já criptografada).
     * O Spring Security compara com a senha informada no login.
     */
    @Override
    public String getPassword() {
        return senha;
    }

    /**
     * Retorna o login do usuário.
     * Usado pelo Spring Security como identificador único.
     */
    @Override
    public String getUsername() {
        return login;
    }

    // Os métodos abaixo controlam o status da conta.
    // Retornam true para simplificar: conta sempre válida e ativa.
    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // Getters
    public String getId() { return id; }
    public String getLogin() { return login; }
    public String getSenha() { return senha; }
    public String getFuncao() { return funcao; }
}
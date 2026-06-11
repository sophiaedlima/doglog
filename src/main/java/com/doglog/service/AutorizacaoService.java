package com.doglog.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.doglog.repository.UsuarioRepository;

/**
 * Serviço de autorização do Spring Security.
 *
 * O Spring Security chama loadUserByUsername automaticamente
 * toda vez que alguém tenta se autenticar na aplicação.
 *
 * @Service indica que é um componente de serviço Spring.
 * A implementação de UserDetailsService é o que faz o Spring
 * reconhecer essa classe como o provedor de usuários do sistema.
 */
@Service
public class AutorizacaoService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public AutorizacaoService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Busca o usuário no banco de dados pelo login.
     * Se não encontrar, lança UsernameNotFoundException
     * e o Spring Security retorna 401 automaticamente.
     */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        UserDetails usuario = usuarioRepository.findByLogin(username);

        if (usuario == null) {
            throw new UsernameNotFoundException(
                "Usuário não encontrado: " + username
            );
        }

        return usuario;
    }
}
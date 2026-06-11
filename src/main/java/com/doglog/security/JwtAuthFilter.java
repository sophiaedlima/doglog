package com.doglog.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro JWT: intercepta toda requisição HTTP antes
 * de chegar aos Controllers.
 *
 * OncePerRequestFilter garante que o filtro executa
 * exatamente uma vez por requisição.
 *
 * O fluxo é:
 * 1. Lê o header Authorization
 * 2. Extrai o token (remove o prefixo "Bearer ")
 * 3. Valida o token com o JwtUtil
 * 4. Se válido, registra o usuário no SecurityContext
 * 5. Passa a requisição para o próximo filtro
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Se não há header Authorization ou não começa com "Bearer ",
        // passa para o próximo filtro sem autenticar.
        // O Spring Security vai bloquear a requisição depois
        // se a rota precisar de autenticação.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Remove o prefixo "Bearer " para obter só o token
        String token = authHeader.substring(7);
        String username = jwtUtil.extrairUsername(token);

        // Só autentica se:
        // 1. Conseguiu extrair o username do token
        // 2. O usuário ainda não está autenticado no contexto
        //    (evita reprocessar a autenticação desnecessariamente)
        if (username != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            if (jwtUtil.isTokenValido(token, userDetails)) {
                // Cria o objeto de autenticação do Spring Security
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // Adiciona detalhes da requisição (IP, session, etc.)
                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // Registra no SecurityContext: a partir daqui,
                // o Spring sabe que essa requisição está autenticada
                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        // Passa para o próximo filtro da cadeia
        filterChain.doFilter(request, response);
    }
}
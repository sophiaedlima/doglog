package com.doglog.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utilitário JWT: responsável por gerar, validar
 * e extrair informações dos tokens.
 *
 * @Component registra essa classe como um componente
 * Spring, tornando-a injetável em outros lugares.
 *
 * @Value injeta valores do application.properties
 * diretamente nos campos da classe.
 */
@Component
public class JwtUtil {

    // Injeta o valor de app.jwt.secret do application.properties
    @Value("${app.jwt.secret}")
    private String secret;

    // Injeta o valor de app.jwt.expiration (86400000 = 24 horas em ms)
    @Value("${app.jwt.expiration}")
    private long expiration;

    /**
     * Converte o segredo em uma chave criptográfica.
     * Chamado internamente sempre que precisamos assinar
     * ou verificar um token.
     */
    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Gera um token JWT para o usuário autenticado.
     * O token contém:
     * - subject: o username do usuário
     * - issuedAt: quando foi gerado
     * - expiration: quando expira
     * - assinatura: garante que não foi adulterado
     */
    public String gerarToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }

    /**
     * Extrai o username do token.
     * O username fica no campo "subject" do payload JWT.
     */
    public String extrairUsername(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Valida se o token pertence ao usuário e não expirou.
     * Chamado pelo JwtAuthFilter a cada requisição.
     */
    public boolean isTokenValido(String token, UserDetails userDetails) {
        String username = extrairUsername(token);
        return username.equals(userDetails.getUsername())
                && !isExpirado(token);
    }

    /**
     * Verifica se o token já passou da data de expiração.
     */
    private boolean isExpirado(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    /**
     * Extrai o payload (claims) do token.
     * Claims são os dados armazenados dentro do JWT.
     * Lança exceção automaticamente se a assinatura
     * for inválida ou o token estiver corrompido.
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
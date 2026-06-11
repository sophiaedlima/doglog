package com.doglog.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doglog.dto.AtividadeDTO;
import com.doglog.model.Usuario;
import com.doglog.repository.UsuarioRepository;
import com.doglog.security.JwtUtil;

/**
 * Controller de autenticação.
 *
 * Endpoints públicos (não exigem JWT):
 * POST /api/auth/login     → autentica e retorna token JWT
 * POST /api/auth/registrar → cria novo usuário no banco
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * POST /api/auth/login
     * Valida credenciais e retorna token JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<AtividadeDTO.AuthResponse> login(
            @RequestBody AtividadeDTO.LoginRequest request) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.gerarToken(auth.getName());
        return ResponseEntity.ok(
                new AtividadeDTO.AuthResponse(token, auth.getName())
        );
    }

    /**
     * POST /api/auth/registrar
     * Cria um novo usuário no banco de dados.
     * Verifica se o login já existe antes de salvar.
     * Criptografa a senha com BCrypt antes de persistir.
     */
    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(
            @RequestBody AtividadeDTO.LoginRequest request) {

        // Verifica se o login já existe no banco
        if (usuarioRepository.findByLogin(request.getUsername()) != null) {
            return ResponseEntity.badRequest().build();
        }

        // Criptografa a senha antes de salvar
        String senhaCriptografada = passwordEncoder.encode(request.getPassword());

        // Cria e salva o novo usuário com função ADMIN
        Usuario novoUsuario = new Usuario(
                request.getUsername(),
                senhaCriptografada,
                "ADMIN"
        );
        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().build();
    }
}
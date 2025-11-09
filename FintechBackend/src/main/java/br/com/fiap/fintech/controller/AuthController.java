package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.UsuarioResponseDTO;
import br.com.fiap.fintech.model.Auth;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.security.JwtUtil;
import br.com.fiap.fintech.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario signup(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    @PostMapping("/signin")
    public Auth signin(@RequestBody Usuario usuario) {
        Usuario userDb = usuarioService.buscarTodos().stream()
                .filter(u -> u.getEmail().equals(usuario.getEmail()) &&
                        u.getSenha().equals(usuario.getSenha()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuário ou senha inválidos"));

        String token = jwtUtil.gerarToken(userDb.getId(), userDb.getNome(), userDb.getEmail(), userDb.getCpf(), userDb.getEndereco(), userDb.getDataNascimento().toString());

        UsuarioResponseDTO userDto = new UsuarioResponseDTO(
                userDb.getId(),
                userDb.getNome(),
                userDb.getEmail(),
                userDb.getCpf(),
                userDb.getEndereco(),
                userDb.getDataNascimento()
        );

        return new Auth(token, userDto);
    }


    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Usuario usuario) {
        return "Link de redefinição enviado para " + usuario.getEmail();
    }
}

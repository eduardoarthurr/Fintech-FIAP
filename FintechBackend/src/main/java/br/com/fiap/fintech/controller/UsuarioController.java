package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.UsuarioResponseDTO;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    private UsuarioResponseDTO toDto(Usuario usuario) {
        if (usuario == null) return null;
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getEndereco(),
                usuario.getDataNascimento()
        );
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDTO salvar(@RequestBody Usuario usuario) {
        logger.info("Recebido usuário para salvar: email={} nome={}", usuario.getEmail(), usuario.getNome());

        Usuario saved = usuarioService.salvar(usuario);
        if (saved == null) {
            throw new RuntimeException("Erro ao salvar usuário");
        }

        return toDto(saved);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioResponseDTO buscarPorId(@PathVariable int id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return toDto(usuario);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UsuarioResponseDTO> buscarTodos() {
        return usuarioService.buscarTodos()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, String>> excluir(@PathVariable int id) {
        // busca para obter o nome (lança se não existir)
        Usuario usuario = usuarioService.buscarPorId(id);

        // executa a exclusão
        usuarioService.excluir(id);

        // retorna 200 com JSON { "message": "Usuário <nome> excluído" }
        return ResponseEntity.ok(Map.of("message", "Usuário " + usuario.getNome() + " excluído"));
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioResponseDTO atualizar(@PathVariable int id, @RequestBody Usuario usuario) {
        Usuario updated = usuarioService.atualizar(id, usuario);
        return toDto(updated);
    }
}

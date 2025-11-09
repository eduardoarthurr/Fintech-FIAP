package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.ContaRequestDTO;
import br.com.fiap.fintech.dto.UsuarioResponseDTO;
import br.com.fiap.fintech.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @PostMapping
    public UsuarioResponseDTO.ContaResponseDTO criar(@RequestBody ContaRequestDTO dto) {
        return contaService.salvar(dto);
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO.ContaResponseDTO buscarPorId(@PathVariable int id) {
        return contaService.buscarPorId(id);
    }

    @GetMapping
    public List<UsuarioResponseDTO.ContaResponseDTO> listar() {
        return contaService.buscarTodos();
    }

    @PutMapping("/{id}")
    public UsuarioResponseDTO.ContaResponseDTO atualizar(@PathVariable int id, @RequestBody ContaRequestDTO dto) {
        return contaService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) {
        contaService.excluir(id);
    }
}

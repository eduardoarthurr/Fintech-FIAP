package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.OrcamentoRequestDTO;
import br.com.fiap.fintech.dto.OrcamentoResponseDTO;
import br.com.fiap.fintech.service.OrcamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamento")
public class OrcamentoController {

    @Autowired
    private OrcamentoService orcamentoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrcamentoResponseDTO salvar(@RequestBody OrcamentoRequestDTO dto) {
        return orcamentoService.salvar(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrcamentoResponseDTO buscarPorId(@PathVariable int id) {
        return orcamentoService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrcamentoResponseDTO> buscarTodos() {
        return orcamentoService.buscarTodos();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrcamentoResponseDTO atualizar(@PathVariable int id, @RequestBody OrcamentoRequestDTO dto) {
        return orcamentoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable int id) {
        orcamentoService.excluir(id);
    }
}

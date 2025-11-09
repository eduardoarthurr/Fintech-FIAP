package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.TransacaoRequestDTO;
import br.com.fiap.fintech.dto.TransacaoResponseDTO;
import br.com.fiap.fintech.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacao")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransacaoResponseDTO salvar(@RequestBody TransacaoRequestDTO dto) {
        return transacaoService.salvar(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TransacaoResponseDTO buscarPorId(@PathVariable int id) {
        return transacaoService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TransacaoResponseDTO> buscarTodos() {
        return transacaoService.buscarTodos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void excluir(@PathVariable int id) {
        transacaoService.excluir(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TransacaoResponseDTO atualizar(@PathVariable int id, @RequestBody TransacaoRequestDTO transacao) {
        return transacaoService.atualizar(id, transacao);
    }

}

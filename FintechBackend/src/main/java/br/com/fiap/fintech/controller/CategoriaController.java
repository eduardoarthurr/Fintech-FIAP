package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.dto.CategoriaRequestDTO;
import br.com.fiap.fintech.dto.CategoriaResponseDTO;
import br.com.fiap.fintech.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaResponseDTO salvar(@RequestBody CategoriaRequestDTO dto) {
        return categoriaService.salvar(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CategoriaResponseDTO buscarPorId(@PathVariable int id) {
        return categoriaService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CategoriaResponseDTO> buscarTodos() {
        return categoriaService.buscarTodos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void excluir(@PathVariable int id) {
        categoriaService.excluir(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CategoriaResponseDTO atualizar(@PathVariable int id, @RequestBody CategoriaRequestDTO categoria) {
        return categoriaService.atualizar(id, categoria);
    }
}

package br.com.fiap.fintech.service;

import br.com.fiap.fintech.dto.CategoriaRequestDTO;
import br.com.fiap.fintech.dto.CategoriaResponseDTO;
import br.com.fiap.fintech.model.Categoria;
import br.com.fiap.fintech.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public CategoriaResponseDTO salvar(CategoriaRequestDTO dto) {
        Categoria categoria = new Categoria();

        categoria.setNome(dto.getNome());
        categoria.setTipo(dto.getTipo());

        Categoria salva = categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(salva.getId(), salva.getNome(), salva.getTipo());
    }

    public CategoriaResponseDTO buscarPorId(int id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if(categoria.isPresent()) {
            Categoria cat = categoria.get();
            return new CategoriaResponseDTO(cat.getId(), cat.getNome(), cat.getTipo());
        }else{
            throw new RuntimeException("Categoria não encontrada.");
        }
    }

    public List<CategoriaResponseDTO> buscarTodos() {
        return categoriaRepository.findAll().stream().map(cat -> new CategoriaResponseDTO(cat.getId(), cat.getNome(), cat.getTipo())).collect(Collectors.toList());
    }

    public String excluir(int id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if(categoria.isPresent()) {
            categoriaRepository.deleteById(id);
            return "Categoria excluida com sucesso.";

        }else {
            throw new RuntimeException("Categoria não encontrada");
        }
    }

    public CategoriaResponseDTO atualizar(int id, CategoriaRequestDTO dto) {
        Optional<Categoria> categoriaAtual = categoriaRepository.findById(id);
        if(categoriaAtual.isEmpty()) {
            throw new RuntimeException("Categoria não encontrada");
        }

        Categoria categoria = categoriaAtual.get();
        categoria.setNome(dto.getNome());
        categoria.setTipo(dto.getTipo());

        Categoria atualizada = categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(atualizada.getId(), atualizada.getNome(), atualizada.getTipo());
    }
}

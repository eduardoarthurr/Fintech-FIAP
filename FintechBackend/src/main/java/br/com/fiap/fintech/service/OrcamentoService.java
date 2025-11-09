package br.com.fiap.fintech.service;

import br.com.fiap.fintech.dto.OrcamentoRequestDTO;
import br.com.fiap.fintech.dto.OrcamentoResponseDTO;
import br.com.fiap.fintech.model.Categoria;
import br.com.fiap.fintech.model.Orcamento;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.repository.CategoriaRepository;
import br.com.fiap.fintech.repository.OrcamentoRepository;
import br.com.fiap.fintech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrcamentoService {

    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public OrcamentoResponseDTO salvar(OrcamentoRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Orcamento orcamento = new Orcamento(
                dto.getMes(),
                dto.getAno(),
                dto.getValorLimite(),
                usuario,
                categoria
        );

        Orcamento salvo = orcamentoRepository.save(orcamento);

        return toResponseDTO(salvo);
    }

    public OrcamentoResponseDTO buscarPorId(int id) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orçamento não encontrado"));

        return toResponseDTO(orcamento);
    }

    public List<OrcamentoResponseDTO> buscarTodos() {
        return orcamentoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public OrcamentoResponseDTO atualizar(int id, OrcamentoRequestDTO dto) {
        Orcamento orcamentoAtual = orcamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orçamento não encontrado"));

        orcamentoAtual.setMes(dto.getMes());
        orcamentoAtual.setAno(dto.getAno());
        orcamentoAtual.setValorLimite(dto.getValorLimite());

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        orcamentoAtual.setUsuario(usuario);
        orcamentoAtual.setCategoria(categoria);

        Orcamento atualizado = orcamentoRepository.save(orcamentoAtual);
        return toResponseDTO(atualizado);
    }

    public void excluir(int id) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orçamento não encontrado"));
        orcamentoRepository.delete(orcamento);
    }

    private OrcamentoResponseDTO toResponseDTO(Orcamento orcamento) {
        return new OrcamentoResponseDTO(
                orcamento.getId(),
                orcamento.getMes(),
                orcamento.getAno(),
                orcamento.getValorLimite(),
                orcamento.getUsuario().getId(),
                orcamento.getCategoria().getId()
        );
    }
}

package br.com.fiap.fintech.service;

import br.com.fiap.fintech.dto.TransacaoRequestDTO;
import br.com.fiap.fintech.dto.TransacaoResponseDTO;
import br.com.fiap.fintech.model.Categoria;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.model.Transacao;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.repository.CategoriaRepository;
import br.com.fiap.fintech.repository.ContaRepository;
import br.com.fiap.fintech.repository.TransacaoRepository;
import br.com.fiap.fintech.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public TransacaoResponseDTO salvar(TransacaoRequestDTO dto) {
        Conta conta = contaRepository.findById(dto.getContaId()).orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId()).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Transacao transacao = new Transacao();
        transacao.setValor(dto.getValor());
        transacao.setData(dto.getData());
        transacao.setDescricao(dto.getDescricao());
        transacao.setConta(conta);
        transacao.setUsuario(usuario);
        transacao.setCategoria(categoria);

        return new TransacaoResponseDTO(transacaoRepository.save(transacao));
    }

    public TransacaoResponseDTO buscarPorId(int id) {
        Transacao transacao = transacaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Transação não encontrada"));
        return new TransacaoResponseDTO(transacao);
    }

    public List<TransacaoResponseDTO> buscarTodos() {
        return transacaoRepository.findAll().stream().map(TransacaoResponseDTO::new).toList();
    }

    public void excluir(int id) {
        if(!transacaoRepository.existsById(id)) {
            throw new RuntimeException("Transação não encontrada");
        }
        transacaoRepository.deleteById(id);
    }

    public TransacaoResponseDTO atualizar(int id, TransacaoRequestDTO dto) {
        Transacao transacao = transacaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        Conta conta = contaRepository.findById(dto.getContaId()).orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId()).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        transacao.setValor(dto.getValor());
        transacao.setData(dto.getData());
        transacao.setDescricao(dto.getDescricao());
        transacao.setConta(conta);
        transacao.setUsuario(usuario);
        transacao.setCategoria(categoria);

        return new TransacaoResponseDTO(transacaoRepository.save(transacao));
    }
}

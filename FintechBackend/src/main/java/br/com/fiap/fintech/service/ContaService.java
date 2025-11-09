package br.com.fiap.fintech.service;

import br.com.fiap.fintech.dto.ContaRequestDTO;
import br.com.fiap.fintech.dto.UsuarioResponseDTO;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.repository.ContaRepository;
import br.com.fiap.fintech.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public UsuarioResponseDTO.ContaResponseDTO salvar(ContaRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Conta conta = new Conta();
        conta.setNome(dto.getNome());
        conta.setTipo(dto.getTipo());
        conta.setSaldo(dto.getSaldo());
        conta.setUsuario(usuario);

        return new UsuarioResponseDTO.ContaResponseDTO(contaRepository.save(conta));
    }

    public UsuarioResponseDTO.ContaResponseDTO buscarPorId(int id) {
        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));
        return new UsuarioResponseDTO.ContaResponseDTO(conta);
    }

    public List<UsuarioResponseDTO.ContaResponseDTO> buscarTodos() {
        return contaRepository.findAll()
                .stream()
                .map(UsuarioResponseDTO.ContaResponseDTO::new)
                .toList();
    }

    public void excluir(int id) {
        if (!contaRepository.existsById(id)) {
            throw new RuntimeException("Conta não encontrada");
        }
        contaRepository.deleteById(id);
    }

    public UsuarioResponseDTO.ContaResponseDTO atualizar(int id, ContaRequestDTO dto) {
        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada."));

        conta.setNome(dto.getNome());
        conta.setTipo(dto.getTipo());
        conta.setSaldo(dto.getSaldo());

        if (conta.getUsuario().getId() != dto.getUsuarioId()) {
            Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
            conta.setUsuario(usuario);
        }

        return new UsuarioResponseDTO.ContaResponseDTO(contaRepository.save(conta));
    }
}

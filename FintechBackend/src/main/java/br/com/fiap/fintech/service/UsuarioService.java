package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Usuário com este e-mail já existe.");
        } else {
            return usuarioRepository.save(usuario);
        }
    }

    public Usuario buscarPorId(int id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            return usuario.get();
        }else{
            throw new RuntimeException("Usuário não encontrado.");
        }
    }

    public List<Usuario> buscarTodos() {
        if (usuarioRepository.count() == 0) {
        throw new RuntimeException("Nenhum usuário encontrado.");
        } else {
            return usuarioRepository.findAll();
        }
    }

    public void excluir(int id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if(usuario.isPresent()) {
            usuarioRepository.deleteById(id);
        }else{
            throw new RuntimeException("Usuário não encontrado.");
        }
    }

    public Usuario atualizar(int id, Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(usuario.getNome() != null) usuarioExistente.setNome(usuario.getNome());
        if(usuario.getEmail() != null) usuarioExistente.setEmail(usuario.getEmail());
        if(usuario.getEndereco() != null) usuarioExistente.setEndereco(usuario.getEndereco());
        if(usuario.getCpf() != null) usuarioExistente.setCpf(usuario.getCpf());
        if(usuario.getDataNascimento() != null) usuarioExistente.setDataNascimento(usuario.getDataNascimento());
        if(usuario.getSenha() != null) usuarioExistente.setSenha(usuario.getSenha());

        return usuarioRepository.save(usuarioExistente);

    }

}

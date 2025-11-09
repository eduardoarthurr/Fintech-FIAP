package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Integer> {
}

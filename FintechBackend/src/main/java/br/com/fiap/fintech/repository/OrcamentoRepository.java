package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Integer> {
}

package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Integer> {
}

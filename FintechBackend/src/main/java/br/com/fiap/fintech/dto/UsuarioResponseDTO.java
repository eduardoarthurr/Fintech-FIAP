package br.com.fiap.fintech.dto;

import br.com.fiap.fintech.model.Conta;

import java.time.LocalDate;

public class UsuarioResponseDTO {

    private int id;
    private String nome;
    private String email;
    private String cpf;
    private String endereco;
    private LocalDate dataNascimento;

    public UsuarioResponseDTO(int id, String nome, String email,
                              String cpf, String endereco, LocalDate dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    public int getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getCpf() { return cpf; }
    public String getEndereco() { return endereco; }
    public LocalDate getDataNascimento() { return dataNascimento; }

    public static class ContaResponseDTO {

        private int id;
        private String nome;
        private String tipo;
        private double saldo;
        private int usuarioId;
        private String usuarioNome;

        public ContaResponseDTO(Conta conta) {
            this.id = conta.getId();
            this.nome = conta.getNome();
            this.tipo = conta.getTipo();
            this.saldo = conta.getSaldo();
            this.usuarioId = conta.getUsuario().getId();
            this.usuarioNome = conta.getUsuario().getNome();
        }

        public int getId() { return id; }
        public String getNome() { return nome; }
        public String getTipo() { return tipo; }
        public double getSaldo() { return saldo; }
        public int getUsuarioId() { return usuarioId; }
        public String getUsuarioNome() { return usuarioNome; }
    }
}

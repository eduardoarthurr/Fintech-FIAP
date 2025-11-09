package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "conta")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CONTA")
    @SequenceGenerator(
            name = "SEQ_CONTA",
            sequenceName = "SEQ_CONTA",
            allocationSize = 1
    )
    @Column(name = "id_conta")
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private double saldo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_usuario", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "conta")
    private List<Transacao> transacao = new ArrayList<>();

    public List<Transacao> getTransacao() { return transacao; }
    public void setTransacao(List<Transacao> transacao) { this.transacao = transacao; }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getNome() { return nome;}
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getSaldo() {
        return saldo;
    }
    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Conta() {}

    public Conta(int id, String nome, String tipo, double saldo, Usuario usuario) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.saldo = saldo;
        this.usuario = usuario;
        this.transacao = new ArrayList<>();
    }

    public Conta(String nome, String tipo, double saldo, Usuario usuario) {
        this.nome = nome;
        this.tipo = tipo;
        this.saldo = saldo;
        this.usuario = usuario;
        this.transacao = new ArrayList<>();
    }
}

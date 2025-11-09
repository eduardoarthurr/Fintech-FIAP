package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transacao")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TRANSACAO")
    @SequenceGenerator(
            name = "SEQ_TRANSACAO",
            sequenceName = "SEQ_TRANSACAO",
            allocationSize = 1
    )
    @Column(name = "id_transacao")
    private int id;

    @Column(nullable = false)
    private double valor;

    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime data;

    @Column(nullable = false)
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_conta", nullable = false)
    private Conta conta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_categoria", nullable = false)
    private Categoria categoria;

    // Getters e Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }

    public LocalDateTime getData() {
        return data;
    }
    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Conta getConta() {
        return conta;
    }
    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Categoria getCategoria() {
        return categoria;
    }
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Transacao() {}

    public Transacao(int id, double valor, LocalDateTime data, String descricao, Conta conta, Usuario usuario, Categoria categoria) {
        this.id = id;
        this.valor = valor;
        this.data = data;
        this.descricao = descricao;
        this.conta = conta;
        this.usuario = usuario;
        this.categoria = categoria;
    }

    public Transacao(double valor, LocalDateTime data, String descricao, Conta conta, Usuario usuario, Categoria categoria) {
        this.valor = valor;
        this.data = data;
        this.descricao = descricao;
        this.conta = conta;
        this.usuario = usuario;
        this.categoria = categoria;
    }
}

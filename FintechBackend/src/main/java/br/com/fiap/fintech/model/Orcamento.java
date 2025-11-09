package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "orcamento")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ORCAMENTO")
    @SequenceGenerator(
            name = "SEQ_ORCAMENTO",
            sequenceName = "SEQ_ORCAMENTO",
            allocationSize = 1
    )
    @Column(name = "id_orcamento")
    private int id;

    @Column(nullable = false)
    private String mes;

    @Column(nullable = false)
    private String ano;

    @Column(name = "valor_limite", nullable = false)
    private double valorLimite;

    @ManyToOne
    @JoinColumn(name = "fk_id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "fk_id_categoria", nullable = false)
    private Categoria categoria;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getMes() {
        return mes;
    }
    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getAno() {
        return ano;
    }
    public void setAno(String ano) {
        this.ano = ano;
    }

    public double getValorLimite() {
        return valorLimite;
    }
    public void setValorLimite(double valorLimite) {
        this.valorLimite = valorLimite;
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

    public Orcamento(){}

    public Orcamento(int id, String mes, String ano, double valorLimite, Usuario usuario, Categoria categoria) {
        this.id = id;
        this.mes = mes;
        this.ano = ano;
        this.valorLimite = valorLimite;
        this.usuario = usuario;
        this.categoria = categoria;
    }

    public Orcamento(String mes, String ano, double valorLimite, Usuario usuario, Categoria categoria) {
        this.mes = mes;
        this.ano = ano;
        this.valorLimite = valorLimite;
        this.usuario = usuario;
        this.categoria = categoria;
    }
}

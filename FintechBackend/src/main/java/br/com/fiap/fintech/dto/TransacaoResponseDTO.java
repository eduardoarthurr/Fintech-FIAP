package br.com.fiap.fintech.dto;

import br.com.fiap.fintech.model.Transacao;

import java.time.LocalDateTime;

public class TransacaoResponseDTO {

    private int id;
    private double valor;
    private LocalDateTime data;
    private String descricao;
    private int contaId;
    private String contaNome;
    private int usuarioId;
    private String usuarioNome;
    private int categoriaId;
    private String categoriaNome;

    public TransacaoResponseDTO(Transacao transacao) {
        this.id = transacao.getId();
        this.valor = transacao.getValor();
        this.data = transacao.getData();
        this.descricao = transacao.getDescricao();
        this.contaId = transacao.getConta().getId();
        this.contaNome = transacao.getConta().getNome();
        this.usuarioId = transacao.getUsuario().getId();
        this.usuarioNome = transacao.getUsuario().getNome();
        this.categoriaId = transacao.getCategoria().getId();
        this.categoriaNome = transacao.getCategoria().getNome();
    }

    public int getId() { return id; }
    public double getValor() { return valor; }
    public LocalDateTime getData() { return data; }
    public String getDescricao() { return descricao; }
    public int getContaId() { return contaId; }
    public String getContaNome() { return contaNome; }
    public int getUsuarioId() { return usuarioId; }
    public String getUsuarioNome() { return usuarioNome; }
    public int getCategoriaId() { return categoriaId; }
    public String getCategoriaNome() { return categoriaNome; }
}

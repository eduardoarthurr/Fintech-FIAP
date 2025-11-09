package br.com.fiap.fintech.dto;

import java.time.LocalDateTime;

public class TransacaoRequestDTO {

    private double valor;
    private LocalDateTime data;
    private String descricao;
    private int contaId;
    private int usuarioId;
    private int categoriaId;

    public double getValor() { return valor; }
    public void setValor(double valor) { this.valor = valor; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public int getContaId() { return contaId; }
    public void setContaId(int contaId) { this.contaId = contaId; }

    public int getUsuarioId() { return usuarioId; }
    public void setUsuarioId(int usuarioId) { this.usuarioId = usuarioId; }

    public int getCategoriaId() { return categoriaId; }
    public void setCategoriaId(int categoriaId) { this.categoriaId = categoriaId; }

}

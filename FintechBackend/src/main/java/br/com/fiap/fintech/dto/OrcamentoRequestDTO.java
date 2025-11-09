package br.com.fiap.fintech.dto;

public class OrcamentoRequestDTO {
    private String mes;
    private String ano;
    private double valorLimite;
    private int usuarioId;
    private int categoriaId;

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

    public int getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getCategoriaId() {
        return categoriaId;
    }
    public void setCategoriaId(int categoriaId) {
        this.categoriaId = categoriaId;
    }

}

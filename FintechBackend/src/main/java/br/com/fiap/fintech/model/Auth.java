package br.com.fiap.fintech.model;

import br.com.fiap.fintech.dto.UsuarioResponseDTO;

public class Auth {

    private String token;
    private String tokenType = "Bearer";
    private UsuarioResponseDTO usuario;


    public Auth(String token, UsuarioResponseDTO usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public UsuarioResponseDTO getUsuario() {
        return usuario;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setUsuario(UsuarioResponseDTO usuario) {
        this.usuario = usuario;
    }
}

package br.com.fiap.fintech.security;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class JwtAspect {

    private final JwtUtil jwtUtil;

    public JwtAspect(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Around("@annotation(br.com.fiap.fintech.security.RequireJwt)")
    public Object validateToken(ProceedingJoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new RuntimeException("Não foi possível obter request");
        }

        HttpServletRequest request = attributes.getRequest();
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Token não fornecido");
        }

        String token = header.substring(7);
        String email = jwtUtil.validarToken(token);
        if (email == null) {
            throw new RuntimeException("Token inválido ou expirado");
        }

        // Opcional: colocar email do usuário no contexto
        request.setAttribute("emailUsuario", email);

        return joinPoint.proceed();
    }
}

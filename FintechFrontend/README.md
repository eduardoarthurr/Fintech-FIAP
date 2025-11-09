# Projeto — Instruções de Inicialização

## Sumário

1. Pré-requisitos
2. Frontend — instalação e execução
3. Backend — configuração e execução
4. Usuário de teste (login)
5. Problemas comuns

---

## 1. Pré-requisitos

Antes de rodar o projeto, garanta que você tem instalado:

- **Node.js** (recomendado v20+)
- **npm** (ou yarn, se preferir)
- **Java** (recomendado 17+)
- **Maven** ou **Gradle** (dependendo do seu build tool)
- Conexão com a base de dados da faculdade (as credenciais são fornecidas pela instituição)

---

## 2. Frontend

### Instalar dependências

No diretório do frontend, rode:

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

- O frontend será servido na porta **3000** por padrão (`http://localhost:3000`).

---

## 3. Backend (Spring Boot)

### Onde inserir as credenciais da faculdade

Edite o arquivo de configuração de propriedades do Spring Boot. Normalmente está em:

```
src/main/resources/application.properties
```

Se for utilizar suas próprias credenciais de aluno ou professor, em `application.properties`, adicione (ou substitua) as linhas:

```properties

spring.datasource.username=RM56XXXX   # <-- inserir a username que a faculdade forneceu
spring.datasource.password=11XXXX     # <-- inserir a password que a faculdade forneceu

```

### Como executar

Se o projeto usa **Maven**:

Por padrão o **Backend** roda na porta **8080** (ou conforme configurado no `application.properties` com `server.port`).

---

## 4. Dados de autenticação do usuário de teste (login)

Exemplo de usuário usado apenas para testes locais:

Para ter acesso insira em no formulário de login,

```usuário

email=alberto.roberto@gmail.com
senha=12456878

```

ou use caso esteja usando suas credenciais de aluno ou professor precisa criar um usuário em http://localhost:3000/signup.

## 5. Problemas comuns

- **Frontend não inicia**: verifique versão do Node; apague `node_modules` e rode `npm install` novamente.
- **Backend não conecta ao DB**: confirme `spring.datasource.url`, `username` e `password`. Cheque se a faculdade libera acesso remoto ao host/porta.
- **Portas ocupadas**: verifique processos usando as portas `3000` (frontend) e `8080` (backend) e mate-os se necessário.
- **Erro de senha**: se estiver rodando local e não existir usuário, crie um seed ou registre via endpoint de cadastro.

---

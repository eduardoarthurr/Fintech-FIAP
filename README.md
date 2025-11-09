
---

# 💸 FINTECH — Sistema de Controle Financeiro

> **Projeto acadêmico** desenvolvido com o objetivo de criar um sistema moderno e funcional de controle financeiro pessoal, integrando conceitos de tecnologia, design e boas práticas de desenvolvimento web.

---

## 🎯 **Objetivo do Projeto**

O **FINTECH** (anteriormente chamado **NEXO**) foi criado para ajudar usuários a **organizar suas finanças pessoais** de maneira prática e intuitiva.
O sistema permite que o usuário:

* Cadastre **categorias** de renda e despesa;
* Crie e gerencie **orçamentos** com base nessas categorias;
* Tenha uma visão clara sobre **entradas, saídas e saldo atual**;
* Controle suas finanças digitais com uma **interface moderna e responsiva**.

Este projeto faz parte de um **trabalho acadêmico**, com o intuito de aplicar na prática os conhecimentos obtidos no curso de **Análise e Desenvolvimento de Sistemas**.

---

## 🧠 **Conceito e Motivação**

A ideia central do sistema é **simplificar o controle financeiro**, reduzindo a fricção entre o usuário e suas decisões de gasto.
O FINTECH busca entregar uma **experiência fluida**, onde o usuário consegue acompanhar suas movimentações com clareza e organização.

Além do aspecto técnico, o projeto reflete o aprendizado sobre **integração entre front-end e back-end**, **uso de hooks personalizados**, e **gerenciamento de estado** em aplicações reativas.

---

## 🧩 **Tecnologias Utilizadas**

### **Frontend**

* **Next.js 14 (App Router)**
* **React** com **Hooks** (`useState`, `useEffect`, `useSession`)
* **TypeScript**
* **Tailwind CSS** — estilização e responsividade
* **ShadCN/UI** — biblioteca moderna de componentes
* **Lucide React** — ícones leves e escaláveis

### **Backend**

* **Java (Spring Boot)**
* **API REST** — integração entre front-end e back-end
* **Banco de Dados Relacional** (Oracle)

### **Autenticação**

* **Next-Auth** — controle de sessão e autenticação de usuários

---

## ⚙️ **Funcionalidades Principais**

✅ Login e autenticação de usuários
✅ Cadastro, edição e exclusão de **categorias** (Renda / Despesa)
✅ Criação e gerenciamento de **orçamentos** vinculados a categorias
✅ Atualização automática das listas após ações CRUD
✅ Interface intuitiva e reativa
✅ Feedbacks visuais e alertas de erro

---

## 🧱 **Arquitetura do Sistema**

O projeto segue uma estrutura modular, baseada no padrão **MVC adaptado para React/Next.js**:

```
src/
 ├─ app/
 │   ├─ auth/         # Gerenciamento de login e sessão
 │   ├─ categorias/   # Tela de categorias
 │   ├─ orcamentos/   # Tela de orçamentos
 │   └─ layout/       # Estrutura base da aplicação
 │
 ├─ shared/
 │   ├─ services/     # Serviços que conectam com a API (fetch/axios)
 │   ├─ components/   # Componentes reutilizáveis (Sidebar, Botões, Cards)
 │   └─ hooks/        # Hooks personalizados (Modelos de controle de estado)
 │
 ├─ styles/           # Estilos globais com Tailwind
 └─ utils/            # Funções auxiliares e helpers
```

---

## 🚧 **Desafios Enfrentados e Soluções**

Durante o desenvolvimento, alguns desafios técnicos foram enfrentados e superados:

### 🧩 1. Erro de Hidratação (Hydration Error)

**Problema:** divergência entre o HTML renderizado no servidor (SSR) e o HTML renderizado no cliente.
**Solução:** uso correto do `useEffect` para garantir que a busca de dados ocorresse apenas no lado do cliente, evitando inconsistências de renderização.

---

### 🔗 2. Integração Front-End e Back-End

**Problema:** incompatibilidades nos formatos de JSON entre o Next.js e o Spring Boot.
**Solução:** criação de **services específicos** (`categoria.service.ts`, `orcamento.service.ts`) para padronizar as requisições HTTP e os retornos de dados.

---

### 🔐 3. Autenticação com Next-Auth

**Problema:** dificuldade em vincular dados ao usuário logado na sessão.
**Solução:** implementação do hook `useSession()` e passagem do `session.data.user.id` para todas as rotas e operações protegidas.

---
## 📘 **Aprendizados Adquiridos**

Durante o desenvolvimento do **FINTECH**, foram adquiridos diversos aprendizados importantes:

* Como estruturar um projeto **Next.js com App Router** e componentes Client/Server;
* Como evitar erros de **hidratação** com uso adequado de `useEffect`;
* Como criar **hooks personalizados** para controlar lógicas de tela (Model Hooks);
* A importância de **padronizar as respostas da API** e tratar erros;
* A prática de versionamento no **GitHub**, integração contínua e commits organizados;
* O valor da **colaboração entre colegas** e a importância de comunicar problemas técnicos de forma clara.

## 🖼️ **Interface do Sistema (Prints das Telas)**

> *(Adicione aqui suas imagens depois de fazer os prints!)*
> Recomendo colocar as imagens na pasta `/public/images` e usar o caminho relativo, por exemplo:

---
### 🔹 Tela de Login

![Tela de Login](https://github.com/eduardoarthurr/Fintech-FIAP/blob/main/img/login.png)

### 🔹 Tela de Categorias

![Tela de Categorias](./public/images/categorias.png)

### 🔹 Tela de Orçamentos

![Tela de Orçamentos](./public/images/orcamentos.png)

### 🔹 Dashboard Financeiro

![Dashboard](./public/images/dashboard.png)

---

## 🎓 **Natureza Acadêmica**

Este projeto foi desenvolvido como **atividade integradora** do curso de **Análise e Desenvolvimento de Sistemas**, com o objetivo de consolidar os seguintes aprendizados:

* Estruturação de aplicações **Full Stack**;
* Comunicação entre **front-end (Next.js)** e **back-end (Spring Boot)**;
* Controle de estado e reatividade no **React**;
* Autenticação e segurança com **Next-Auth**;
* Design responsivo com **Tailwind CSS**.

Além do aprendizado técnico, o projeto também proporcionou experiências práticas de **trabalho em equipe**, **resolução de conflitos**, e **gestão de tempo**.

---

## 🚀 **Como Executar o Projeto**

### 🖥️ **Frontend**

```bash
# Instalar dependências
npm install

# Rodar o projeto em modo de desenvolvimento
npm run dev
```

### ⚙️ **Backend**

```bash
# Rodar a API com Spring Boot
mvn spring-boot:run
```

---

## 👥 **Autores**

Projeto desenvolvido por estudantes do curso de **Análise e Desenvolvimento de Sistemas**, como parte de um **projeto acadêmico integrador**.

> 💡 O projeto representa o esforço coletivo para unir teoria e prática, aplicando conceitos reais do mercado de tecnologia.

---


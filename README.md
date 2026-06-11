# DogLog Backend

Sistema de registro de atividades de pets — Spring Boot + JWT + PostgreSQL

**Aluno:** Sophia Eduarda Lima
**Disciplina:** Desenvolvimento de Software Web
**Professor:** Alexandre Cláudio de Almeida
**PUC Goiás — Junho de 2026**

---

## Tecnologias

- Java 21 + Spring Boot 3.2
- Spring Security com autenticação JWT
- Spring Data JPA + Hibernate
- PostgreSQL

---

## Como rodar

**1. Criar o banco de dados**

```sql
CREATE DATABASE doglog_db;
```

**2. Configurar a senha do PostgreSQL**

Edite o arquivo `src/main/resources/application.properties` e ajuste:

```properties
spring.datasource.password=SUA_SENHA_AQUI
```

**3. Rodar o backend**

```bash
mvn spring-boot:run
```

**4. Criar o usuário admin**

```bash
curl -X POST http://localhost:8080/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

---

## Endpoints

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | /api/auth/login | Autentica e retorna token JWT | Pública |
| POST | /api/auth/registrar | Cria novo usuário no banco | Pública |
| GET | /api/atividades | Lista todas as atividades | JWT |
| POST | /api/atividades | Registra nova atividade | JWT |
| DELETE | /api/atividades/{id} | Remove uma atividade | JWT |
| GET | /api/dashboard/stats | Retorna contadores do dashboard | JWT |

---

## Diagrama do banco de dados

### Tabela: usuarios

| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | varchar(50) | PK |
| login | varchar(255) | UNIQUE, NOT NULL |
| senha | varchar(255) | NOT NULL (BCrypt) |
| funcao | varchar(255) | NOT NULL |

### Tabela: atividades

| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | bigserial | PK |
| cachorro_id | integer | NOT NULL |
| cachorro_nome | varchar(255) | NOT NULL |
| horario | timestamp | NOT NULL |
| observacao | varchar(255) | nullable |
| tipo | varchar(255) | NOT NULL (ENUM) |

**Valores permitidos para tipo:** `RACAO` `PETISCO` `PASSEIO` `DORMIR`

### Cachorros fixos (sem tabela no banco)

| id | Nome |
|----|------|
| 1 | Amora |
| 2 | Lilica |
| 3 | Snoopy |

> Os cachorros são definidos como constantes no frontend. Por ser um sistema pessoal, o cadastro de cachorros não é necessário.

## Arquitetura em camadas
Requisição HTTP
↓
JwtAuthFilter (valida token JWT)
↓
Controller (recebe e responde HTTP)
↓
Service (regras de negócio + conversão DTO)
↓
Repository (acesso ao banco via Spring Data JPA)
↓
PostgreSQL

### Decisões de arquitetura

- **Stateless:** sem sessão HTTP. Cada requisição é autenticada via token JWT no header `Authorization: Bearer <token>`.
- **DTOs:** isolam o modelo interno da API pública. O Controller nunca expõe a entidade diretamente.
- **AutorizacaoService:** implementa `UserDetailsService` do Spring Security, buscando o usuário no banco via `findByLogin`. Segue o padrão ensinado em aula.
- **Cachorros fixos:** Amora, Lilica e Snoopy são definidos no frontend como constantes. Não possuem tabela própria no banco, pois o sistema é pessoal e o cadastro de cachorros não é uma funcionalidade necessária.
- **CORS:** configurado para aceitar requisições apenas de `localhost:5173` (Vite dev server do frontend).
  },
])
```

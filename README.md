<div align="center">

# 🧩 ConecTEA

**Plataforma de apoio a pessoas com Transtorno do Espectro Autista, suas famílias e profissionais.**

[![Status](https://img.shields.io/badge/status-Fase%200%20%C2%B7%20Organiza%C3%A7%C3%A3o-yellow)]()
[![Licença](https://img.shields.io/badge/licen%C3%A7a-TBD-lightgrey)]()

</div>

---

## Sobre o projeto

O ConecTEA é um projeto de conclusão de curso, desenvolvido com padrões profissionais de engenharia de software e com a possibilidade de evoluir para um produto comercial.

> **A descrição do produto está em definição.** Problema, solução e proposta de valor serão preenchidos ao final da **Fase 1 — Validação**, com base em pesquisa real com o público-alvo. Não registramos aqui nada que ainda não tenha sido validado.

**Documentação completa:** [`conectea-vault`](https://github.com/ConecTEA/conectea-vault)

---

## ⚠️ Status atual

**🟡 Fase 0 — Organização.**

Este repositório contém a **estrutura e os padrões** do projeto. **Ainda não há código de aplicação.** Nenhuma funcionalidade foi implementada: sem autenticação, sem cadastro, sem dashboard, sem pagamentos.

Isso é intencional. A base vem primeiro.

---

## Tecnologias

> **Em definição** — ver [ADR-004 — Stack tecnológica](https://github.com/ConecTEA/conectea-vault).

| Camada | Tecnologia | Status |
|---|---|---|
| Framework | Next.js | 🔵 proposto |
| Linguagem | TypeScript | 🔵 proposto |
| Estilo | Tailwind CSS | 🔵 proposto |
| Banco de dados | PostgreSQL via Supabase | 🟡 indicado |
| Autenticação | Supabase Auth | 🔵 proposto |
| Pagamentos | Stripe | 🟡 indicado |
| Deploy | Vercel | 🟡 indicado |
| Testes | TBD | ⚪ indefinido |

🟡 indicado pela equipe · 🔵 recomendação técnica, aguarda aprovação · ⚪ sem definição

---

## Estrutura

```
conectea/
├── apps/
│   └── web/                 Aplicação (UI + rotas de API)
│       └── src/
│           ├── app/         Rotas e páginas
│           ├── components/  Componentes da aplicação
│           └── lib/         Utilitários e clientes
├── packages/
│   ├── ui/                  Componentes compartilhados (design system)
│   └── config/              ESLint, TypeScript, Tailwind
├── supabase/
│   ├── migrations/          Schema versionado
│   └── policies/            Políticas de Row Level Security
├── docs/
│   └── adr/                 Cópia dos ADRs (fonte de verdade: o vault)
└── .github/
    ├── workflows/           CI: lint, build, varredura de segredos
    └── CODEOWNERS           Revisores automáticos (em definição)
```

Monorepo — decisão e justificativa em **ADR-003**.

---

## Como executar

> ⚠️ **Ainda não é possível executar o projeto.** A stack não foi definida (ADR-004) e não há código de aplicação. O procedimento abaixo é o previsto.

### Pré-requisitos

| Ferramenta | Versão |
|---|---|
| Node.js | 20 ou superior |
| Git | 2.40 ou superior |
| Gerenciador de pacotes | TBD |

### Passos

```bash
# 1. Clonar
git clone https://github.com/ConecTEA/conectea.git
cd conectea

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# preencha .env.local com os valores recebidos por canal seguro

# 4. Rodar
npm run dev
```

Abra `http://localhost:3000`.

> 🔴 **Nunca commite o `.env.local`.** Nunca use o prefixo `NEXT_PUBLIC_` em segredos — ele publica o valor no navegador.

---

## Como contribuir

Leia o [guia de contribuição](https://github.com/ConecTEA/.github/blob/main/CONTRIBUTING.md) antes do primeiro Pull Request.

### Resumo

1. Pegue ou abra uma **Issue** — todo trabalho começa por ela
2. Crie a branch: `git switch -c feat/12-descricao-curta`
3. Faça commits no padrão **Conventional Commits**
4. Abra o **Pull Request** preenchendo o template inteiro
5. Aguarde **1 aprovação** e a **CI verde**
6. **Squash merge** e branch deletada

---

## Estratégia de branches

**GitHub Flow** — ver **ADR-002**.

```
main ──●─────●─────●──→   protegida · sempre deployável
        \       /
         feat/12-cadastro-responsavel
```

| Prefixo | Uso |
|---|---|
| `feat/` | nova funcionalidade |
| `fix/` | correção de bug |
| `docs/` | documentação |
| `refactor/` | refatoração |
| `test/` | testes |
| `chore/` | manutenção e dependências |
| `ci/` | pipeline |

Formato: `<tipo>/<número-da-issue>-<descrição-em-kebab-case>`

**Não usamos** `develop`, `release/*` nem `hotfix/*` — a justificativa está no ADR-002.

### Commits

```
feat(auth): adiciona cadastro de responsável
fix(api): corrige validação de CPF nulo
docs(adr): registra ADR-002 sobre estratégia de branches
```

---

## Segurança

- Nenhum segredo entra no repositório. Jamais.
- `gitleaks` roda na CI e **bloqueia o merge** se encontrar credencial
- Toda tabela do banco nasce com **RLS habilitada**
- Nenhum dado pessoal real em desenvolvimento, log, Issue ou screenshot

Política completa: [SECURITY.md](https://github.com/ConecTEA/.github/blob/main/SECURITY.md)

Encontrou uma vulnerabilidade? **Não abra Issue pública** — contate um Admin da organização.

---

## Documentação

| Assunto | Onde |
|---|---|
| Central de conhecimento | [`conectea-vault`](https://github.com/ConecTEA/conectea-vault) |
| Decisões arquiteturais | `21 - Decisões` no vault |
| Roadmap e fases | `19 - Roadmap` no vault |
| Padrões da organização | [`.github`](https://github.com/ConecTEA/.github) |

---

## Responsáveis

> **Em definição.** Nenhum nome foi registrado porque a equipe ainda não foi formalizada. Será preenchido junto com os times do GitHub e o `CODEOWNERS`.

| Papel | Responsável |
|---|---|
| Tech Lead | TBD |
| Desenvolvimento | TBD |
| Design / UX | TBD |
| Documentação | TBD |
| Orientação acadêmica | TBD |

---

## Licença

**Em definição.** Ver ADR futuro sobre licenciamento — a escolha depende da decisão sobre exploração comercial.

---

<div align="center">
<sub>ConecTEA · Projeto de Conclusão de Curso · 2026</sub>
</div>

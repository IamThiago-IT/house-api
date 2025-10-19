
# house-api

API simples para gerenciar trocas/registro de compras relacionadas a "Gas" (modelo `GasExchange`). Projeto escrito em TypeScript usando Fastify e Prisma (SQLite por padrão).

## Tecnologias

- Node.js + TypeScript
- Fastify
- Prisma (SQLite - `prisma/schema.prisma`)
- Swagger (docs em `/docs`)
- pnpm como gerenciador de pacotes

## Visão geral

O servidor expõe endpoints para criar e consultar registros do modelo `GasExchange`. A documentação automática (OpenAPI/Swagger) está disponível em `/docs` quando o servidor estiver rodando.

## Requisitos

- Node.js 18+ (ou versão compatível com dependências)
- pnpm

## Instalação (local)

1. Instale dependências:

```bash
pnpm install
```

2. Gere o cliente Prisma (opcional — o projeto já inclui `@prisma/client`):

```bash
pnpm exec prisma generate
```

3. (Dev) Rode migrações ou aplique o schema ao banco local:

```bash
pnpm exec prisma migrate dev
```

O projeto usa SQLite por padrão com o datasource apontando para `prisma/dev.db` (conforme `prisma/schema.prisma`). Se preferir outro banco, ajuste o `datasource` (ou a variável `DATABASE_URL`) no `schema.prisma`.

## Scripts úteis

- `pnpm dev` — inicia o servidor em modo desenvolvimento (usa `tsx watch src/server.ts`).

Exemplo:

```bash
pnpm dev
```

## Executando a API

Após iniciar, o servidor escuta por padrão em http://localhost:3333.

- API root: http://localhost:3333
- Documentação Swagger: http://localhost:3333/docs

## Modelo principal (prisma/schema.prisma)

O modelo utilizado é `GasExchange` com os campos:

- `id` (Int, auto-increment)
- `data` (DateTime, default now)
- `quantidade` (Int)
- `preco_unitario` (Float)
- `local_compra` (String)
- `telefone_contato` (String)
- `observacao` (String?)
- `custo_total` (Float, default 0)

## Endpoints (exemplos)

Observação: o prefixo das rotas registrado é `/gas` (conforme `src/server.ts`). Abaixo exemplos genéricos — verifique a definição completa dos schemas na rota ou na documentação Swagger.

- Listar registros

```bash
curl http://localhost:3333/gas
```

- Criar um registro

```bash
curl -X POST http://localhost:3333/gas \
	-H "Content-Type: application/json" \
	-d '{
		"quantidade": 2,
		"preco_unitario": 45.5,
		"local_compra": "Posto Central",
		"telefone_contato": "(11) 99999-9999",
		"observacao": "Compra para o mês"
	}'
```

Resposta esperada (exemplo):

```json
{
	"id": 1,
	"data": "2025-10-19T...",
	"quantidade": 2,
	"preco_unitario": 45.5,
	"local_compra": "Posto Central",
	"telefone_contato": "(11) 99999-9999",
	"observacao": "Compra para o mês",
	"custo_total": 91.0
}
```

## Prisma e Banco de Dados

- Gerar client: `pnpm exec prisma generate`
- Criar/rodar migrações (desenvolvimento): `pnpm exec prisma migrate dev`
- Aplicar migrações em produção: `pnpm exec prisma migrate deploy`

O datasource atual está configurado para SQLite (`file:./dev.db`). Se quiser usar variáveis de ambiente, modifique `schema.prisma` para usar `env("DATABASE_URL")` e crie um `.env` com `DATABASE_URL`.

## Observações de desenvolvimento

- A documentação Swagger é gerada automaticamente e servida em `/docs`.
- Para editar ou adicionar rotas veja `src/routes`.
- O Prisma Client é instanciado em `src/server.ts` e exportado como `prisma`.

## Contribuição

Pull requests são bem-vindos. Para mudanças no schema do Prisma, crie uma migração e execute os testes locais antes de abrir PR.

## Licença

Projeto sem licença definida. Adicione um arquivo `LICENSE` ou atualize o `package.json` se desejar especificar uma licença.

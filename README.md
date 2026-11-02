# Atlas.Switch

Switch de ferramentas de organização e gestão de produtividade.

Atlas.Switch reúne módulos operacionais, de conteúdo e de gestão em uma plataforma com acesso por equipe e permissões.

## Stack

- Next.js 15, React 19 e TypeScript
- PostgreSQL com Drizzle ORM
- Tailwind CSS 4 e componentes shadcn/ui

## Executar localmente

Requisitos: Node.js 20 ou superior, pnpm 10 e PostgreSQL.

```bash
git clone https://github.com/AtlasGlobalTec/Atlas.Switch.git
cd Atlas.Switch
pnpm install
cp .env.example .env
```

Configure no `.env` os valores locais de `POSTGRES_URL`, `AUTH_SECRET` e `BASE_URL`. Não versione esse arquivo nem compartilhe segredos.

```bash
pnpm db:migrate
pnpm db:seed
pnpm dev
```

A aplicação inicia em `http://localhost:3003`.

## Prévia de UX

`/preview` mostra uma proposta de dashboard com dados fictícios. Ela é uma demonstração visual e não consulta o banco nem representa dados de uma equipe real.

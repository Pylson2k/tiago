# Portfólio Tiago Filadelfo

Portfólio profissional de Tiago Filadelfo, reconstruído com Astro, TypeScript e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

O site fica disponível em `http://localhost:4321`.

## Validação

```bash
npm run check
npm run build
npm run lint
npm run format:check
npm test -- --passWithNoTests
```

## Estrutura nova

- `src/pages/index.astro` — composição da página principal;
- `src/components/sections/` — seções isoladas e tipadas;
- `src/content/` — conteúdo editorial e inventário de mídia;
- `src/content.config.ts` — schemas Zod das coleções;
- `src/styles/` — tokens e estilos globais;
- `public/assets/` — ativos usados no novo preview;
- `public/vendor/body-muscles/` — biblioteca local do mapa anatômico interativo;
- `PLANO_RECONSTRUCAO_PORTFOLIO.md` — plano completo de evolução e operação.

A página inclui apresentação, resultados, provas sociais, Treino da Semana, mapa de biomecânica, serviços, método, trajetória, conteúdo educativo, depoimentos e contato.

Os arquivos `index.html`, `src/index.css`, `src/main.js` e `src/lead-tracker.js` são a implementação legada e permanecem no repositório apenas para referência durante a migração.

## Conteúdo e publicação

Informações com status `needs-review` não devem ser promovidas para a publicação final sem confirmação de credenciais, autorização de uso de imagem, contatos e dados dos casos.

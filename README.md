# Landing page do Tiago

Portfólio profissional de Tiago Gomes Filadelfo — Profissional de Educação Física & Treinador (TF Personal).

## Estrutura

- `index.html` — estrutura e textos de seção (SEO). Controle de galeria e prints é feito via JS.
- `src/main.js` — interatividade (formulário de leads, biomecânica, slider antes/depois, vídeo, menu mobile, galeria, lightbox).
- `src/data/content.js` — **conteúdo centralizado e editável**: galeria multimídia (`GALLERY`), prints de depoimentos (`TESTIMONIAL_PRINTS`), contatos / WhatsApp (`SITE`).
- `src/index.css` — estilo editorial esportivo (paleta navy + electric blue + prata).
- `src/lead-tracker.js` — rastreio de leads (UTMs, código SS, eventos). Mantido oculto na UI.
- `assets/` — imagens, depoimentos e vídeo reais.

## Como rodar

Abra `index.html` em um navegador moderno, ou sirva a pasta:

```bash
python -m http.server 8080
# e acesse http://localhost:8080
```

Módulos ES (`type="module"`) exigem que a página seja servida via HTTP (não via `file://`).

## Como editar conteúdo

- **Galeria**: ajuste o array `GALLERY` em `src/data/content.js` (imagem, alt, kicker e título). O grid se reorganiza automaticamente.
- **Prints de depoimentos**: ajuste `TESTIMONIAL_PRINTS` (a chave `lary | cassia | ana` liga cada print ao card correspondente via `data-testimonial-key`).
- **WhatsApp / links**: ajuste `SITE` em `src/data/content.js`.

## Observações

- Não publicar resultados como garantidos: as métricas de resultados são relatos das alunas e já possuem aviso de isenção (`results-note`).
- Todas as interações do formulário redirecionam para o WhatsApp oficial com código de rastreio.
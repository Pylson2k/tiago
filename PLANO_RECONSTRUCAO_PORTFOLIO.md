# Plano de reconstrução do portfólio — Tiago Filadelfo

## 1. Objetivo

Reconstruir o portfólio do zero como um site premium, rápido e responsivo que:

- posicione Tiago como treinador;
- apresente formação e experiência sem exageros ou informações não confirmadas;
- demonstre resultados reais, incluindo o caso Gabriel;
- explique serviços e método de trabalho;
- conduza o visitante para uma conversa no WhatsApp;
- seja fácil de manter e ampliar.

O projeto atual será usado somente como fonte de mídias e informações verificáveis. O HTML, CSS e JavaScript monolíticos não serão reaproveitados como fundação.

## 2. Princípios obrigatórios

1. Não inventar credenciais, métricas, datas ou resultados.
2. Não publicar textos marcados como "a confirmar".
3. Não usar os termos "especialista", "clínico" ou "reabilitação" sem comprovação e habilitação.
4. Publicar fotos e depoimentos de alunos somente com autorização documentada.
5. Remover telefones, nomes completos e outros dados desnecessários dos prints.
6. Tratar performance, acessibilidade, SEO e privacidade como requisitos, não como melhorias opcionais.
7. Evitar efeitos decorativos que atrapalhem leitura, conversão ou desempenho.
8. Manter uma única fonte de verdade para conteúdo, links e contatos.

## 3. Direção visual

Conceito: **Performance Editorial**.

- Estética atlética, premium, humana e baseada em evidências.
- Fundo preto, superfícies claras e um único acento azul/índigo.
- Fotografia real como principal elemento visual.
- Tipografia forte nos títulos e altamente legível nos textos.
- Poucos cards, bordas discretas e quase nenhuma sombra.
- Animações curtas e funcionais.
- Identidade própria da TF Personal; não copiar literalmente a WHOOP ou outra marca.

### Paleta inicial

- Ink: `#090A0C`
- Graphite: `#17191E`
- Paper: `#F5F5F2`
- White: `#FFFFFF`
- Hairline: `#D9DCE2`
- Electric Indigo: `#4A53FF`

Os valores finais devem ser validados junto ao logo e às fotografias selecionadas.

## 4. Arquitetura de conteúdo

### 4.1 Hero

- Foto profissional do Tiago.
- Título sugerido: **Treino inteligente. Evolução que você consegue sustentar.**
- Texto curto sobre planejamento individualizado.
- CTA primário: **Agendar conversa no WhatsApp**.
- CTA secundário: **Ver resultados**.

### 4.2 Faixa de confiança

Exibir apenas informações confirmadas, como:

- atendimento presencial e/ou online;
- acompanhamento individualizado;
- formação em andamento;
- localização de atendimento.

### 4.3 Resultado em destaque — Gabriel

Estrutura:

- Desafio;
- Estratégia;
- Evolução observada;
- pilares do acompanhamento;
- ressalva sobre diferenças de luz, distância e enquadramento;
- CTA contextual.

A imagem disponível já é uma composição lado a lado. Não utilizar um comparador falso com a mesma imagem nas duas camadas. Um slider só poderá ser criado se os registros forem separados corretamente em dois arquivos independentes.

### 4.4 Serviços

- Treinamento presencial;
- Consultoria online;
- Planejamento personalizado;
- Avaliação física, somente se confirmada como serviço habilitado.

Cada serviço deve explicar para quem é, como funciona e qual é o próximo passo.

### 4.5 Método

1. Conhecer o aluno e o objetivo.
2. Planejar o treinamento.
3. Acompanhar execução e adesão.
4. Ajustar estímulos e progressão.

### 4.6 Sobre e autoridade

- trajetória resumida;
- graduação e instituição confirmadas;
- certificados válidos;
- filosofia de trabalho;
- projetos acadêmicos ou comunitários relevantes.

### 4.7 Conteúdo técnico

- biomecânica explicada em linguagem simples;
- treino da semana;
- vídeos de execução;
- artigos ou vídeos curtos.

Essa seção deve demonstrar conhecimento sem dominar a narrativa comercial do site.

### 4.8 Depoimentos e contato

- três ou quatro depoimentos selecionados;
- trechos curtos na página;
- conversa completa em lightbox acessível, após anonimização;
- WhatsApp, e-mail e redes oficiais;
- CTA final forte.

## 5. Stack técnica aprovada

### Fundação

- Astro estável;
- TypeScript em modo `strict`;
- Tailwind CSS v4;
- Astro Content Collections;
- Zod.

### Interface e mídia

- Astro Assets e Sharp para imagens responsivas;
- Motion para animações discretas;
- Lucide para ícones;
- Embla Carousel somente quando um carrossel for realmente necessário;
- PhotoSwipe ou dialog próprio acessível para galeria;
- vídeo H.264/WebM com poster, `preload="metadata"` e ativação tardia.

### Qualidade

- ESLint;
- Prettier;
- Astro Check;
- Vitest;
- Playwright;
- `@axe-core/playwright`;
- Lighthouse CI.

### Restrições de dependências

- Não usar Bootstrap ou Material UI.
- Não transformar o site inteiro em React.
- Não instalar shadcn/ui apenas para componentes básicos.
- Não usar GSAP por padrão.
- Não instalar duas bibliotecas para a mesma função.
- Toda dependência adicional precisa ter manutenção ativa, licença compatível e justificativa no README.

## 6. Estrutura proposta

```text
src/
  components/
    layout/
    sections/
    ui/
    interactive/
  content/
    cases/
    testimonials/
    articles/
  data/
    profile.ts
    services.ts
    site.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    privacidade.astro
  styles/
    global.css
    tokens.css
  lib/
    analytics.ts
    whatsapp.ts
    schemas.ts
public/
  media/
tests/
  e2e/
  unit/
```

## 7. Organização dos subagentes

O agente principal será o orquestrador. Como os agentes compartilham o mesmo diretório, nenhum subagente poderá trocar de branch por conta própria. O orquestrador cria e mantém a branch de trabalho, integra os módulos e realiza commits por fase.

### Onda 1 — Descoberta, somente leitura

#### Subagente A — Conteúdo e conformidade

Responsabilidades:

- criar matriz `confirmado / pendente / não publicar`;
- verificar credenciais, serviços, contatos e resultados;
- identificar dados pessoais nos prints;
- registrar autorizações necessárias;
- produzir o copy deck da página;
- revisar linguagem médica, profissional e publicitária.

Entregáveis:

- inventário de conteúdo;
- matriz de comprovação;
- lista de pendências;
- copy final proposto.

#### Subagente B — UX e conversão

Responsabilidades:

- desenhar jornada do visitante;
- produzir wireframes mobile e desktop;
- definir hierarquia das seções;
- definir CTAs, menu e fluxo até o WhatsApp;
- especificar estados de foco, abertura, erro e carregamento.

Entregáveis:

- wireframes;
- mapa de seções;
- inventário de componentes;
- critérios de responsividade.

#### Subagente C — Identidade e mídia

Responsabilidades:

- inventariar imagens e vídeos;
- classificar o que pode ou não ser publicado;
- criar plano de recorte e compressão;
- definir tokens visuais;
- propor tratamento editorial para Gabriel e demais casos.

Entregáveis:

- planilha de ativos;
- direção visual;
- tokens;
- plano de otimização de mídia.

### Gate 1 — Aprovação da descoberta

O orquestrador só pode iniciar a implementação quando existirem:

- sitemap aprovado;
- wireframes básicos;
- conteúdo classificado;
- lista clara de informações ausentes;
- direção visual escolhida.

### Onda 2 — Fundação técnica

#### Subagente D — Arquitetura

Responsabilidades:

- criar o novo projeto Astro;
- configurar TypeScript, Tailwind, lint e formatação;
- criar schemas e Content Collections;
- implementar layout, tokens e SEO base;
- configurar testes e CI;
- estabelecer contratos dos componentes.

Esse subagente trabalha sozinho na fundação para evitar conflitos estruturais.

### Gate 2 — Fundação validada

Validações mínimas:

- instalação reproduzível;
- build concluído;
- Astro Check sem erros;
- lint e testes iniciais verdes;
- preview carregando o layout base.

### Onda 3 — Construção paralela

#### Subagente E — Interface principal

Escopo exclusivo:

- navegação;
- hero;
- faixa de confiança;
- serviços;
- método;
- sobre;
- contato.

#### Subagente F — Resultados e mídia

Escopo exclusivo:

- caso Gabriel;
- demais casos aprovados;
- depoimentos;
- galeria e lightbox;
- pipeline de imagens e vídeos.

#### Subagente G — Interações e conversão

Escopo exclusivo:

- WhatsApp;
- UTMs;
- formulário mínimo;
- consentimento e privacidade;
- animações;
- menu mobile;
- comportamento de teclado;
- eventos de analytics sem PII.

O arquivo `src/pages/index.astro` deve ser integrado apenas pelo orquestrador.

### Onda 4 — Integração e QA

#### Subagente H — QA independente

Responsabilidades:

- testar 360, 390, 768, 1024 e 1440 px;
- testar Chrome, Edge e Firefox;
- testar navegação completa por teclado;
- executar Playwright e axe;
- medir Lighthouse;
- revisar links, CTAs, WhatsApp e formulários;
- auditar credenciais, métricas e consentimentos;
- procurar erros de console, overflow e regressões visuais.

O agente de QA não deve corrigir silenciosamente os próprios achados. Ele registra os problemas; o orquestrador distribui as correções e solicita nova validação.

## 8. Git, revisão e publicação

Fluxo obrigatório:

1. Criar Issue com objetivo e critérios de aceite.
2. Criar branch `codex/rebuild-portfolio`.
3. Fazer commits atômicos por fase.
4. Fazer push da branch.
5. Abrir Pull Request.
6. Gerar preview na Vercel.
7. Executar review técnico, visual e de conteúdo.
8. Corrigir falhas e acompanhar CI.
9. Obter aprovação final do responsável pelo portfólio.
10. Fazer merge e validar o deploy de produção.

Os subagentes não devem realizar merge ou deploy por conta própria.

## 9. Critérios de aceite

### Conteúdo

- nenhuma informação "a confirmar";
- nenhuma credencial ou métrica inventada;
- autorizações registradas;
- depoimentos fiéis à fonte;
- contato e redes verificados;
- ressalva adequada nos resultados;
- política de privacidade disponível.

### Experiência

- proposta compreensível em até cinco segundos;
- CTA principal visível sem rolagem em mobile e desktop;
- fluxo `entender oferta -> ver prova -> escolher serviço -> abrir WhatsApp` completo;
- zero overflow horizontal em 360 px;
- alvos de interação com pelo menos 44 px;
- foco visível;
- suporte a `prefers-reduced-motion`;
- uso completo por teclado.

### Técnica

- build, lint, Astro Check e testes verdes;
- sem erros de console;
- Lighthouse Performance, Accessibility e SEO acima de 90, buscando 95;
- LCP abaixo de 2,5 segundos;
- CLS abaixo de 0,1;
- INP abaixo de 200 ms;
- imagens responsivas em AVIF/WebP quando compatível;
- JavaScript inicial abaixo de 100 KB compactado, salvo justificativa;
- links internos e externos válidos.

## 10. Informações que precisam ser confirmadas

- nome profissional definitivo;
- graduação, instituição e período;
- situação do CREF;
- cidade e local do atendimento;
- serviços realmente disponíveis;
- WhatsApp, e-mail e redes oficiais;
- autorizações dos alunos;
- datas e métricas dos casos;
- preços ou decisão de mantê-los no contato privado;
- domínio final;
- ferramentas de analytics desejadas.

Informação pendente deve permanecer fora da interface pública, nunca aparecer como placeholder.

## 11. Prompt mestre para o agente orquestrador

```text
Atue como engenheiro principal e orquestrador da reconstrução do portfólio
de Tiago Filadelfo.

Leia integralmente PLANO_RECONSTRUCAO_PORTFOLIO.md antes de agir.

Reconstrua o site do zero como um portfólio premium de treinador, com foco
em credibilidade, resultados reais, performance, acessibilidade e conversão
para WhatsApp.

Use Astro + TypeScript strict + Tailwind CSS como fundação. Utilize Zod e
Astro Content Collections para conteúdo, Astro Assets/Sharp para mídia,
Motion para animações discretas, Lucide para ícones e Playwright, axe-core,
Vitest e Lighthouse CI para validação.

Você pode instalar bibliotecas adicionais somente quando resolverem um
problema real, tiverem manutenção ativa e licença compatível, não duplicarem
funções existentes e não prejudicarem performance ou acessibilidade.

Organize os subagentes nas ondas definidas pelo plano. Não permita edição
concorrente dos mesmos arquivos. O orquestrador é responsável pela branch,
integração, validação, commits, push, PR, acompanhamento do CI e merge.

Não publique placeholders, alegações sem fonte, credenciais não comprovadas,
resultados inventados ou dados pessoais desnecessários.

Continue até que o objetivo esteja implementado e validado. Ao concluir,
informe arquivos alterados, testes, métricas, commits, push, PR, CI, preview,
merge, deploy e qualquer pendência real.
```

## 12. Definição de pronto

O projeto somente estará concluído quando:

- o conteúdo estiver aprovado;
- o portfólio estiver funcional em mobile e desktop;
- acessibilidade e performance atingirem os limites definidos;
- testes e CI estiverem verdes;
- a branch tiver sido enviada;
- a Pull Request tiver sido revisada;
- o preview tiver sido aprovado;
- o merge e o deploy tiverem sido verificados.

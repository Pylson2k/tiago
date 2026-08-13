// Estilo: Sinal de esforço — editorial esportivo brasileiro para Tiago Gomes Filadelfo. A pessoa vem antes do efeito; provas reais, método claro e CTAs acionáveis organizam toda a experiência.
const assets = {
  portrait: "assets/tiago-portrait.webp",
  training: "assets/tiago-training.webp",
  community: "assets/futebol-comunidade.jpeg",
  crowd: "assets/futebol-torcida.jpeg",
  beforeAfterOne: "assets/antes-depois-01.jpeg",
  beforeAfterTwo: "assets/antes-depois-02.jpeg",
  inclusionOne: "assets/estudo-inclusao-01.jpeg",
  inclusionThree: "assets/estudo-inclusao-03.jpeg",
  hypertension: "assets/estudo-hipertensao.jpeg",
  video: "assets/video-futebol.mp4",
};

const links = {
  booking: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MfHkVJDhfLXEoX2NZsGmqWxSXftKcVkK0PsR1tG7bI9913oYdUj0s291sfQYIgOc826W-vdJm",
  whatsapp: "https://wa.me/5511963552470?text=Ol%C3%A1%20Tiago%2C%20quero%20conversar%20sobre%20um%20plano%20de%20treino.",
  instagram: "https://www.instagram.com/reel/DIy91aMOAVY/?igsh=YmJja3lrOHRsOW4y",
};

const root = document.querySelector("#root");

root.innerHTML = `
  <main class="site-shell">
    <header class="site-header">
      <a class="brand-mark" href="#top" aria-label="Tiago Gomes Filadelfo — voltar ao topo"><span class="brand-box">TF</span><span class="brand-name">TIAGO GOMES<br /><b>FILADELFO</b></span></a>
      <div class="header-status"><span class="status-dot"></span> treino personalizado / São Paulo</div>
      <nav class="site-nav" aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#resultados">Resultados</a><a href="#contato">Contato</a></nav>
      <a class="header-booking" href="${links.booking}" target="_blank" rel="noreferrer">agendar ↗</a>
      <span class="header-index">[ 01—09 ]</span>
    </header>

    <section id="top" class="hero-section" aria-labelledby="hero-title">
      <div class="hero-cream" aria-hidden="true"></div><div class="hero-grid" aria-hidden="true"></div>
      <img class="hero-photo js-hero-image" src="${assets.portrait}" alt="Tiago Gomes Filadelfo em uma academia" />
      <div class="hero-vignette" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="eyebrow js-hero-kicker"><span>TIAGO GOMES FILADELFO</span><span>EDUCAÇÃO FÍSICA / TREINO</span></p>
        <h1 id="hero-title" class="hero-title"><span class="hero-line-wrap"><span class="hero-line js-hero-line">TREINO</span></span><span class="hero-line-wrap indent"><span class="hero-line js-hero-line">COM</span></span><span class="hero-line-wrap"><span class="hero-line hero-line-yellow js-hero-line">MÉTODO<span class="hero-punct">.</span></span></span></h1>
        <div class="hero-bottom js-hero-meta"><p>Hipertrofia, condicionamento e definição muscular com ciência, técnica e estratégia.</p><a class="arrow-link" href="${links.booking}" target="_blank" rel="noreferrer">agende uma conversa <span>↗</span></a></div>
      </div>
      <div class="hero-side-note">01 / 09<br />cada repetição tem um motivo</div><div class="scroll-cue"><span>desça para evoluir</span><span class="scroll-line"></span></div>
      <div class="hero-tag">TREINO<br /><span>PERSONALIZADO</span></div>
    </section>

    <div class="marquee-band" aria-hidden="true"><div class="marquee-track js-marquee-track">CIÊNCIA <span>✳</span> TÉCNICA <span>✳</span> ESTRATÉGIA <span>✳</span> ACOMPANHAMENTO <span>✳</span> CIÊNCIA <span>✳</span> TÉCNICA <span>✳</span> ESTRATÉGIA <span>✳</span> ACOMPANHAMENTO <span>✳</span></div></div>

    <section id="sobre" class="about-section section-paper"><div class="section-marker dark js-reveal"><span>02</span><span>sobre o Tiago</span><span>↘</span></div><div class="about-grid"><div><p class="micro-copy js-reveal">Educação física aplicada à vida real.</p><h2 class="section-title dark-title js-reveal">Treinar é<br /><span>entender</span><br />o corpo.</h2></div><div class="about-copy js-reveal"><p class="lead-copy">Tiago Gomes Filadelfo trabalha com treino personalizado para quem quer evoluir com direção, segurança e consistência.</p><p>Sua prática cruza biomecânica, periodização, conexão mente-músculo e leitura individual. Os estudos de caso em esportes adaptados e em um plano para hipertensão mostram uma visão que não separa resultado de cuidado.</p><div class="about-facts"><span><b>01</b> Educação física</span><span><b>02</b> Biomecânica e periodização</span><span><b>03</b> Treino inclusivo e seguro</span></div></div></div><div class="about-photo js-reveal"><img src="${assets.training}" alt="Tiago trabalhando em uma academia" loading="lazy" /><span>trajetória / técnica / presença</span></div></section>

    <section id="metodo" class="method-section section-dark"><div class="section-marker js-reveal"><span>03</span><span>o método</span><span>↘</span></div><div class="method-heading"><p class="micro-copy js-reveal">Três pilares para fazer cada repetição contar.</p><h2 class="section-title js-reveal">Resultado<br /><span>real</span> pede<br />método.</h2></div><div class="method-list"><article class="method-item js-reveal"><span class="method-number">01</span><h3>Análise<br />individual</h3><p>Biotipo, histórico, objetivo e restrições entram no plano desde o primeiro dia.</p><span class="method-arrow">↗</span></article><article class="method-item js-reveal"><span class="method-number">02</span><h3>Treino<br />inteligente</h3><p>Técnica, progressão e estímulo na medida certa — sem copiar a ficha de outra pessoa.</p><span class="method-arrow">↗</span></article><article class="method-item js-reveal"><span class="method-number">03</span><h3>Você<br />entende</h3><p>Educação para executar melhor, evitar lesões e assumir o controle da própria evolução.</p><span class="method-arrow">↗</span></article></div></section>

    <section id="servicos" class="services-section section-yellow"><div class="section-marker dark js-reveal"><span>04</span><span>serviços e programas</span><span>↘</span></div><div class="services-heading"><p class="micro-copy js-reveal">Um ponto de partida para cada objetivo.</p><h2 class="section-title dark-title js-reveal">Escolha o<br /><span>próximo</span><br />movimento.</h2><p class="services-note js-reveal">O formato final é definido depois de entender sua rotina, seu histórico e o que você quer construir.</p></div><div class="services-grid"><article class="service-card js-reveal"><span class="service-number">01</span><h3>Personal<br />presencial</h3><p>Treino acompanhado, correção ao vivo e progressão construída no seu ritmo.</p><a href="${links.booking}" target="_blank" rel="noreferrer">agendar conversa ↗</a></article><article class="service-card js-reveal"><span class="service-number">02</span><h3>Consultoria<br />online</h3><p>Plano, ajustes e acompanhamento para quem precisa de direção mesmo à distância.</p><a href="${links.booking}" target="_blank" rel="noreferrer">agendar conversa ↗</a></article><article class="service-card js-reveal"><span class="service-number">03</span><h3>Avaliação e<br />acompanhamento</h3><p>Uma leitura inicial para transformar objetivo, contexto e disponibilidade em próximo passo.</p><a href="${links.booking}" target="_blank" rel="noreferrer">agendar conversa ↗</a></article><article class="service-card service-card-dark js-reveal"><span class="service-number">04</span><h3>Plano por<br />objetivo</h3><p>Hipertrofia, condicionamento, definição ou retorno ao movimento — sempre com análise individual.</p><a href="${links.whatsapp}" target="_blank" rel="noreferrer">falar no WhatsApp ↗</a></article></div></section>

    <section id="resultados" class="results-section section-paper"><div class="section-marker dark js-reveal"><span>05</span><span>portfólio de resultados</span><span>↘</span></div><div class="results-heading"><p class="micro-copy js-reveal">Prova visual de que consistência muda o corpo.</p><h2 class="section-title dark-title js-reveal">Evolução<br /><span>registrada.</span></h2><p class="results-note js-reveal">Imagens de antes e depois fornecidas para apresentar transformações reais. Cada resultado depende do processo, da rotina e do acompanhamento individual.</p></div><div class="before-after-grid"><figure class="before-after-card js-reveal"><img src="${assets.beforeAfterOne}" alt="Comparação de antes e depois de uma aluna em processo de transformação corporal" loading="lazy" /><figcaption><span>transformação 01</span><b>força / composição corporal</b></figcaption></figure><figure class="before-after-card offset js-reveal"><img src="${assets.beforeAfterTwo}" alt="Comparação de antes e depois de uma mulher em processo de transformação corporal" loading="lazy" /><figcaption><span>transformação 02</span><b>consistência / confiança</b></figcaption></figure></div></section>

    <section class="football-section section-dark"><div class="football-video js-reveal"><video id="football-video" autoplay muted loop playsinline preload="metadata" poster="${assets.community}" aria-label="Tiago falando sobre futebol, identidade e transformação social"><source src="${assets.video}" type="video/mp4" /></video><span class="video-caption">vídeo / futebol é muito mais do que uma partida</span><button class="video-audio-toggle" type="button" aria-pressed="false" aria-label="Ativar som do vídeo"><span class="audio-state">ativar som</span><span aria-hidden="true">↗</span></button></div><div class="football-copy js-reveal"><span class="micro-copy">Além da academia</span><h2>O corpo<br />também é<br /><em>cultura.</em></h2><p>Para Tiago, o esporte carrega identidade, disciplina, trabalho em equipe e oportunidade. É a mesma visão que aparece no treino: técnica para sustentar a paixão.</p><a class="text-link" href="${links.instagram}" target="_blank" rel="noreferrer">ver conteúdo no Instagram <span>↗</span></a></div></section>

    <section id="conteudo" class="content-section section-dark"><div class="section-marker js-reveal"><span>06</span><span>conteúdo educativo</span><span>↘</span></div><div class="content-heading"><p class="micro-copy js-reveal">Conhecimento que continua depois do treino.</p><h2 class="section-title js-reveal">Entenda<br /><span>antes de</span><br />executar.</h2></div><div class="content-grid"><article class="content-card js-reveal"><img src="${assets.hypertension}" alt="Material de estudo sobre exercício e hipertensão" loading="lazy" /><div><span class="case-kicker">FISIOLOGIA DO EXERCÍCIO</span><h3>Treino também é cuidado.</h3><p>Um plano individualizado considera pressão arterial, resposta ao esforço, progressão e segurança.</p></div></article><article class="content-card js-reveal"><img src="${assets.inclusionOne}" alt="Material de estudo sobre esporte adaptado" loading="lazy" /><div><span class="case-kicker">ESPORTES ADAPTADOS</span><h3>Mais formas de participar.</h3><p>Adaptação, instrução e cooperação mudam a experiência do movimento.</p></div></article><article class="content-card content-card-link js-reveal"><span class="content-index">03</span><div><span class="case-kicker">INSTAGRAM / VÍDEO</span><h3>Treino da semana<br />em movimento.</h3><p>Vídeos curtos, técnica e bastidores do trabalho do Tiago.</p><a href="${links.instagram}" target="_blank" rel="noreferrer">ver conteúdo ↗</a></div></article></div></section>

    <section id="estudos" class="cases-section section-paper"><div class="section-marker dark js-reveal"><span>07</span><span>estudos de caso</span><span>↘</span></div><div class="cases-heading"><p class="micro-copy js-reveal">Ciência aplicada com cuidado e contexto.</p><h2 class="section-title dark-title js-reveal">Treinar<br /><span>também é</span><br />cuidar.</h2><p class="cases-note js-reveal">Os estudos acadêmicos mostram como o exercício precisa respeitar a pessoa, o ambiente e a resposta do corpo.</p></div><div class="cases-grid"><article class="case-card case-wide js-reveal"><img src="${assets.inclusionOne}" alt="Estudo de caso sobre esporte adaptado e inclusão através do movimento" loading="lazy" /><div><span class="case-kicker">EDUCAÇÃO FÍSICA INCLUSIVA</span><h3>Participar<br />no próprio ritmo.</h3><p>Adaptação sensorial, rotina visual, instruções claras e jogos cooperativos para ampliar participação e pertencimento.</p></div></article><article class="case-card js-reveal"><img src="${assets.hypertension}" alt="Estudo de caso sobre exercícios e hipertensão" loading="lazy" /><div><span class="case-kicker">FISIOLOGIA DO EXERCÍCIO</span><h3>Segurança<br />antes da carga.</h3><p>Plano individualizado com progressão, monitoramento e combinação de estímulos aeróbicos, resistidos e de mobilidade.</p></div></article><article class="case-card case-dark js-reveal"><img src="${assets.inclusionThree}" alt="Atividade coletiva de educação física inclusiva" loading="lazy" /><div><span class="case-kicker">PRÁTICA E EDUCAÇÃO</span><h3>Movimento<br />para todos.</h3><p>Uma aula acessível melhora o coletivo, fortalece cooperação e respeita diferentes formas de aprender.</p></div></article></div></section>

    <section id="depoimentos" class="proof-section section-paper"><div class="section-marker dark js-reveal"><span>08</span><span>prova social</span><span>↘</span></div><div class="proof-layout"><div><p class="micro-copy js-reveal">Sem frase inventada. Sem atalho.</p><h2 class="section-title dark-title js-reveal">A próxima<br /><span>história</span><br />é sua.</h2></div><div class="proof-empty js-reveal"><span class="proof-mark">+</span><h3>Depoimentos reais entram aqui.</h3><p>Quando o Tiago enviar prints, vídeos ou frases autorizadas de alunos, esta área vira prova social publicada com contexto e consentimento.</p><a href="${links.whatsapp}" target="_blank" rel="noreferrer">enviar uma mensagem ↗</a></div></div></section>

    <section class="community-section"><img src="${assets.crowd}" alt="Torcida brasileira celebrando em um estádio" loading="lazy" /><div class="community-overlay"></div><div class="community-copy js-reveal"><span class="micro-copy">Uma visão que vai além do espelho.</span><h2>Disciplina<br />para viver<br /><em>melhor.</em></h2><p>Mais força, disposição e confiança para levar o resultado da academia para a vida.</p></div><div class="community-stamp">TF<br /><span>EVOLUÇÃO<br />SEM CÓPIA</span></div></section>

    <section id="contato" class="contact-section section-yellow"><div class="contact-top"><span>09</span><span>comece pelo seu objetivo</span><span>↗</span></div><div class="contact-main"><p class="micro-copy">Seu próximo treino pode começar com uma conversa.</p><h2>Vamos montar<br /><span>seu plano.</span></h2><div class="contact-actions"><a class="contact-link" href="${links.booking}" target="_blank" rel="noreferrer">agendar avaliação <span>↗</span></a><a class="contact-link contact-link-dark" href="${links.whatsapp}" target="_blank" rel="noreferrer">falar no WhatsApp <span>↗</span></a></div></div><div class="contact-footer"><span>TIAGO GOMES FILADELFO</span><span>HIPERTROFIA / CONDICIONAMENTO / DEFINIÇÃO</span><a href="#top">voltar ao topo ↑</a></div></section>
  </main>
`;

function bootGsap() {
  const gsap = window.gsap; const ScrollTrigger = window.ScrollTrigger;
  if (!gsap) return;
  const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
  intro.fromTo(".js-hero-line", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .9, stagger: .075 }, .1).fromTo(".js-hero-kicker, .js-hero-meta", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .08 }, .5).fromTo(".js-hero-image", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.15, ease: "power3.inOut" }, .18);
  gsap.to(".js-marquee-track", { xPercent: -50, duration: 24, repeat: -1, ease: "none" });
  if (ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); gsap.utils.toArray(".js-reveal").forEach((element) => gsap.fromTo(element, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%" } })); }
}

function setupFootballAudio() {
  const section = document.querySelector(".football-section");
  const video = document.querySelector("#football-video");
  const toggle = document.querySelector(".video-audio-toggle");
  const label = toggle?.querySelector(".audio-state");
  if (!section || !video || !toggle || !label) return;
  const updateAudioUI = () => { const muted = video.muted; label.textContent = muted ? "ativar som" : "mutar vídeo"; toggle.setAttribute("aria-label", muted ? "Ativar som do vídeo" : "Mutar vídeo"); toggle.setAttribute("aria-pressed", String(!muted)); };
  const tryUnmute = () => { const playback = video.play(); if (playback?.then) playback.then(() => { video.muted = false; video.volume = .82; updateAudioUI(); }).catch(() => { video.muted = true; label.textContent = "toque para ativar"; updateAudioUI(); }); else { video.muted = false; video.volume = .82; updateAudioUI(); } };
  toggle.addEventListener("click", () => { if (video.muted) tryUnmute(); else { video.muted = true; updateAudioUI(); } });
  if ("IntersectionObserver" in window) { const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= .25)) { tryUnmute(); observer.disconnect(); } }, { threshold: [.25] }); observer.observe(section); }
  section.addEventListener("pointerdown", (event) => { if (!event.target.closest(".video-audio-toggle") && video.muted) tryUnmute(); }, { once: true });
  section.addEventListener("touchstart", (event) => { if (!event.target.closest(".video-audio-toggle") && video.muted) tryUnmute(); }, { once: true, passive: true });
  updateAudioUI();
}

const waitForLibs = () => { if (window.gsap) bootGsap(); else window.setTimeout(waitForLibs, 100); };
waitForLibs();
setupFootballAudio();

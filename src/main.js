/**
 * main.js — Aplicação Interativa & Motor de Conversão
 * Tiago Filadelfo (TF Personal)
 */

import { GALLERY, TESTIMONIAL_PRINTS } from "./data/content.js";

document.addEventListener("DOMContentLoaded", () => {
  initAttributionAndForm();
  initBiomecanicaSelector();
  initComparisonSlider();
  initPhoneMask();
  initSmoothScrollAndSticky();
  initVideoAudioToggle();
  initVideoPlayToggle();
  initMobileNav();
  initGallery();
  initTestimonialPrints();
  initLightbox();
  initCopyrightYear();
  initGsapAnimations();
});

/* ==========================================================================
   1. Integração com LeadTracker & Formulário de Qualificação
   ========================================================================== */
function initAttributionAndForm() {
  const form = document.querySelector("#leadCaptureForm");
  if (!form || !window.LeadTracker) return;

  // Injeta campos ocultos com UTMs e SS identificado
  window.LeadTracker.autoPopulateForm("#leadCaptureForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = form.querySelector("#leadName");
    const phoneInput = form.querySelector("#leadPhone");
    const objectiveInput = form.querySelector("#leadObjective");
    const modalityInput = form.querySelector("#leadModality");
    const submitBtn = form.querySelector("#submitBtn");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const objective = objectiveInput.value;
    const modality = modalityInput.value;

    if (!name || !phone || !objective || !modality) {
      alert("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    // 1. Gera código de rastreio único atribuído ao SS atual
    const activeSS = window.LeadTracker.getActiveSS();
    const trackingCode = window.LeadTracker.generateTrackingCode(activeSS);

    // 2. Dispara eventos para Meta Pixel e GA4
    window.LeadTracker.trackLeadEvent({
      name,
      phone,
      objective: `${modality} - ${objective}`,
      trackingCode
    });

    // 3. Altera estado do botão
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.75";
    submitBtn.innerHTML = `Conectando ao WhatsApp do Tiago...`;

    // 4. Monta a mensagem estruturada e incontestável para o WhatsApp
    const message =
      `Olá Tiago! Meu nome é *${name}*.\n` +
      `Gostaria de saber como funciona o acompanhamento:\n\n` +
      `• *Modalidade:* ${modality}\n` +
      `• *Objetivo:* ${objective}\n` +
      `• *WhatsApp:* ${phone}\n\n` +
      `[Ref: ${trackingCode}]`;

    const whatsappUrl = `https://wa.me/${window.LeadTracker.OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // 5. Redirecionamento após breve timeout para disparo garantido de pixels
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 450);
  });
}

/* ==========================================================================
   2. Máscara de Telefone / WhatsApp
   ========================================================================== */
function initPhoneMask() {
  const phoneInput = document.querySelector("#leadPhone");
  if (!phoneInput) return;

  phoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    e.target.value = val;
  });
}

/* ==========================================================================
   3. Infográfico Interativo de Biomecânica
   ========================================================================== */
const biomecanicaData = {
  peito: {
    title: "Peitoral Maior & Ajuste de Tração",
    subtitle: "Biomecânica de Supinos e Crucifixos",
    tag: "Foco: Feixes Clavicular e Esternal",
    svgColor: "#00e5ff",
    bullets: [
      {
        b: "1. Ângulo do Banco e Linha da Fibra",
        p: "Para ativar o feixe clavicular (porção superior), incline o banco entre 30º e 45º. Inclinações maiores desviam a sobrecarga para o deltoide anterior."
      },
      {
        b: "2. Depressão e Adução das Escápulas",
        p: "Manter as escápulas presas no banco estabiliza a glenoumeral, evitando atrito no manguito rotador e isolando o esforço no peitoral."
      },
      {
        b: "3. Amplitude de Movimento com Segurança",
        p: "Descer a barra ou halteres até o nível do esterno com os cotovelos a cerca de 60º do tronco, e não abertos a 90º."
      }
    ]
  },
  costas: {
    title: "Dorsais, Romboides & Escápulas",
    subtitle: "Biomecânica de Puxadas e Remadas",
    tag: "Foco: Expansão Dorsal e Espessura",
    svgColor: "#38bdf8",
    bullets: [
      {
        b: "1. Vetor de Força e Direção dos Cotovelos",
        p: "Puxadas com cotovelos colados ao tronco enfatizam o grande dorsal. Cotovelos abertos direcionam a tensão para romboides e trapézio médio."
      },
      {
        b: "2. Depressão Escapular Antes da Puxada",
        p: "Inicie o movimento deprimindo os ombros para baixo antes de flexionar os cotovelos, ativando as fibras inferiores do trapézio e dorsal."
      },
      {
        b: "3. Conexão Mente-Músculo",
        p: "Pense em empurrar com os cotovelos para trás, e não em 'puxar com as mãos', reduzindo o gasto excessivo dos bíceps."
      }
    ]
  },
  pernas: {
    title: "Membros Inferiores & Glúteos",
    subtitle: "Biomecânica de Agachamento e Leg Press",
    tag: "Foco: Quadríceps, Glúteo Máximo e Isquiotibiais",
    svgColor: "#f59e0b",
    bullets: [
      {
        b: "1. Mobilidade de Tornozelo e Joelhos",
        p: "A dorsiflexão adequada permite agachar profundo sem retroversão pélvica ('buttwink'), protegendo os discos lombares."
      },
      {
        b: "2. Posição dos Pés e Ativação Glútea",
        p: "Posição dos pés ligeiramente abertos (cerca de 15º a 30º) alinha o fêmur com a patela e potencializa o torque do glúteo máximo."
      },
      {
        b: "3. Distribuição de Peso no Pé",
        p: "O tripé do pé (calcanhar, base do dedão e base do dedinho) deve permanecer fixo no chão durante toda a fase excêntrica e concêntrica."
      }
    ]
  },
  deltoides: {
    title: "Deltoides & Estabilização do Manguito",
    subtitle: "Biomecânica das Elevações Laterais e Desenvolvimentos",
    tag: "Foco: Porção Lateral sem Pinçamento",
    svgColor: "#a855f7",
    bullets: [
      {
        b: "1. Plano Escapular (30º à Frente)",
        p: "Execute a elevação lateral cerca de 30º anterior ao corpo. Isso alinha a cabeça do úmero na cavidade glenoide e elimina o impacto no supraespinhal."
      },
      {
        b: "2. Não Ultrapasse a Linha dos Ombros",
        p: "Elevar halteres acima da linha do queixo não recruta mais o deltoide lateral, apenas transfere a tensão para o trapézio superior."
      },
      {
        b: "3. Polegar Ligeiramente para Baixo",
        p: "Mantenha a mão neutra com leve rotação para manter a tensão mecânica constante no ventre muscular do deltoide medial."
      }
    ]
  }
};

function initBiomecanicaSelector() {
  const buttons = document.querySelectorAll(".muscle-btn");
  const titleEl = document.querySelector("#muscleTitle");
  const subtitleEl = document.querySelector("#muscleTargetSub");
  const tagEl = document.querySelector("#muscleGraphicTag");
  const bulletsEl = document.querySelector("#muscleInfoContent .muscle-bullets");
  const svgPath = document.querySelector("#muscleMainPath");

  if (!buttons.length || !titleEl || !bulletsEl) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      const data = biomecanicaData[target];
      if (!data) return;

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      titleEl.textContent = data.title;
      subtitleEl.textContent = data.subtitle;
      tagEl.textContent = data.tag;
      if (svgPath) {
        svgPath.setAttribute("fill", data.svgColor);
        svgPath.setAttribute("stroke", data.svgColor);
      }

      bulletsEl.innerHTML = data.bullets
        .map(
          (b) => `
          <div class="bullet-card">
            <b>${b.b}</b>
            <p>${b.p}</p>
          </div>
        `
        )
        .join("");
    });
  });
}

/* ==========================================================================
   4. Slider Comparativo de Antes e Depois
   ========================================================================== */
function initComparisonSlider() {
  const sliderRange = document.querySelector("#sliderRange");
  const afterImg = document.querySelector(".img-after");
  const sliderHandle = document.querySelector("#sliderHandle");

  if (!sliderRange || !afterImg || !sliderHandle) return;

  const updatePosition = (val) => {
    afterImg.style.clipPath = `inset(0 0 0 ${val}%)`;
    sliderHandle.style.left = `${val}%`;
  };

  sliderRange.addEventListener("input", (e) => {
    updatePosition(e.target.value);
  });

  // Touch e mouse interativo direto no container
  const container = document.querySelector("#beforeAfterSlider");
  if (container) {
    let isDragging = false;

    const onMove = (clientX) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      sliderRange.value = percentage;
      updatePosition(percentage);
    };

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      onMove(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (isDragging) onMove(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    container.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 0) {
          onMove(e.touches[0].clientX);
        }
      },
      { passive: true }
    );
  }

  // Inicializa em 50%
  updatePosition(50);
}

/* ==========================================================================
   5. Rolagem Suave & Botão Sticky
   ========================================================================== */
function initSmoothScrollAndSticky() {
  const stickyBtn = document.querySelector("#stickyCtaBtn");
  const nameInput = document.querySelector("#leadName");

  if (stickyBtn && nameInput) {
    stickyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        nameInput.focus();
      }, 600);
    });
  }
}

/* ==========================================================================
   6. Animações GSAP & ScrollTrigger
   ========================================================================== */
function initGsapAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // Acessibilidade: não anima quem prefere movimento reduzido
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  if (!gsap) return;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".js-reveal").forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 88%"
          }
        }
      );
    });
  }
}

/* ==========================================================================
   7. Controle de Áudio do Vídeo Documental
   ========================================================================== */
function initVideoAudioToggle() {
  const video = document.querySelector("#football-video");
  const btn = document.querySelector("#videoAudioBtn");
  const label = document.querySelector("#audioStateText");

  if (!video || !btn || !label) return;

  btn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      video.volume = 0.85;
      label.textContent = "🔇 Desativar Som";
      btn.setAttribute("aria-label", "Desativar som do vídeo");
    } else {
      video.muted = true;
      label.textContent = "🔊 Ativar Som";
      btn.setAttribute("aria-label", "Ativar som do vídeo");
    }
  });
}

/* ==========================================================================
   8. Controle de Play/Pause do Vídeo Documental
   ========================================================================== */
function initVideoPlayToggle() {
  const video = document.querySelector("#football-video");
  const btn = document.querySelector("#videoPlayBtn");
  const label = document.querySelector("#playStateText");

  if (!video || !btn || !label) return;

  const sync = () => {
    if (video.paused) {
      label.textContent = "▶ Reproduzir";
      btn.setAttribute("aria-label", "Reproduzir vídeo");
    } else {
      label.textContent = "⏸ Pausar";
      btn.setAttribute("aria-label", "Pausar vídeo");
    }
  };

  btn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  sync();
}

/* ==========================================================================
   9. Menu Mobile (Botão Hamburguer)
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#siteNav");

  if (!toggle || !nav) return;

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    nav.classList.toggle("open", open);
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setMenu(false);
  });
}

/* ==========================================================================
   10. Galeria Multimídia (renderizada a partir de src/data/content.js)
   ========================================================================== */
function initGallery() {
  const grid = document.querySelector("#galleryGrid");
  if (!grid) return;

  grid.innerHTML = GALLERY.map(
    (item, index) => `
    <button class="gallery-card js-reveal" type="button"
      data-lightbox-src="${item.src}"
      data-lightbox-alt="${item.alt}"
      data-lightbox-kicker="${item.kicker}"
      data-lightbox-title="${item.title}"
      aria-label="Ampliar imagem: ${item.title}">
      <img src="${item.src}" alt="${item.alt}" loading="${index < 2 ? "eager" : "lazy"}" />
      <span class="gallery-caption">
        <span>${item.kicker}</span>
        ${item.title}
      </span>
    </button>
  `
  ).join("");
}

/* ==========================================================================
   11. Botões "Ver print" dos Depoimentos Reais
   ========================================================================== */
function initTestimonialPrints() {
  document.querySelectorAll(".testimonial-actions").forEach((slot) => {
    const card = slot.closest(".testimonial-card");
    const key = card?.getAttribute("data-testimonial-key");
    const printData = TESTIMONIAL_PRINTS[key];
    if (!printData) return;

    slot.dataset.lightboxSrc = printData.src;
    slot.dataset.lightboxAlt = printData.alt;
    slot.dataset.lightboxKicker = "Print de depoimento";
    slot.dataset.lightboxTitle = "Relato real enviado pela aluna";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "print-btn";
    btn.textContent = "🔍 Ver print do depoimento";
    btn.setAttribute("aria-label", "Ampliar print do depoimento");
    slot.appendChild(btn);
  });
}

/* ==========================================================================
   12. Lightbox de Prévias (galeria + prints)
   ========================================================================== */
function initLightbox() {
  const lightbox = document.querySelector("#lightbox");
  if (!lightbox) return;

  const image = lightbox.querySelector("#lightboxImage");
  const caption = lightbox.querySelector("#lightboxCaption");
  const closeBtn = lightbox.querySelector("#lightboxClose");

  const openLightbox = (src, alt, kicker = "", title = "") => {
    image.src = src;
    image.alt = alt || "";
    caption.textContent = kicker ? `${kicker} // ${title}` : title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Exibido programaticamente (ex.: futuras integrações)
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox-src]");
    if (!trigger) return;
    openLightbox(
      trigger.dataset.lightboxSrc,
      trigger.dataset.lightboxAlt,
      trigger.dataset.lightboxKicker,
      trigger.dataset.lightboxTitle
    );
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

/* ==========================================================================
   13. Ano do Rodapé (atualizado dinamicamente)
   ========================================================================== */
function initCopyrightYear() {
  const year = document.querySelector("#copyrightYear");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}


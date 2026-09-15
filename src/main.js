/**
 * main.js — Aplicação Interativa & Motor de Conversão
 * Tiago Filadelfo (TF Personal)
 */

import { GALLERY, TESTIMONIAL_PRINTS, WORKOUT_WEEK } from "./data/content.js";

function startApp() {
  const modules = [
    ["initAttributionAndForm", initAttributionAndForm],
    ["initBiomecanicaSelector", initBiomecanicaSelector],
    ["initBiomechanicsVideoPlayer", initBiomechanicsVideoPlayer],
    ["initWorkoutOfTheWeek", initWorkoutOfTheWeek],
    ["initCaseStudyTabs", initCaseStudyTabs],
    ["initComparisonSlider", initComparisonSlider],
    ["initPhoneMask", initPhoneMask],
    ["initSmoothScrollAndSticky", initSmoothScrollAndSticky],
    ["initVideoAudioToggle", initVideoAudioToggle],
    ["initVideoPlayToggle", initVideoPlayToggle],
    ["initMobileNav", initMobileNav],
    ["initGallery", initGallery],
    ["initTestimonialPrints", initTestimonialPrints],
    ["initLightbox", initLightbox],
    ["initCopyrightYear", initCopyrightYear],
    ["initGsapAnimations", initGsapAnimations]
  ];

  modules.forEach(([name, fn]) => {
    try {
      fn();
    } catch (err) {
      console.warn(`[TiagoApp] Aviso na inicialização de ${name}:`, err);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}

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
      `Gostaria de agendar uma Avaliação Física / Diagnóstica com você:\n\n` +
      `• *Modalidade de Interesse:* ${modality}\n` +
      `• *Foco / Objetivo:* ${objective}\n` +
      `• *Contato WhatsApp:* ${phone}\n\n` +
      `[Código de Atribuição: ${trackingCode}]`;

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
   3. Infográfico Interativo de Biomecânica (Motor Body-Muscles / WHOOP 2026)
   ========================================================================== */
const biomecanicaData = {
  peito: {
    title: "Peitoral Maior & Tríceps Braquial",
    subtitle: "Biomecânica de Supinos, Apoios e Crucifixos",
    tag: "Recrutamento Principal: Peitoral Clavicular/Esternal & Tríceps",
    latin: "Pectoralis major & Triceps brachii",
    defaultView: "FRONT",
    coachNote: "A depressão e adução prévia das escápulas cria uma base dorsal firme, isolando o feixe clavicular e esternal enquanto poupa o manguito rotador.",
    bodyStateFront: {
      "chest-upper-left": { intensity: 9, selected: true },
      "chest-upper-right": { intensity: 9, selected: true },
      "chest-mid-left": { intensity: 10, selected: true },
      "chest-mid-right": { intensity: 10, selected: true },
      "chest-lower-left": { intensity: 8, selected: true },
      "chest-lower-right": { intensity: 8, selected: true },
      "shoulder-front-left": { intensity: 6, selected: false },
      "shoulder-front-right": { intensity: 6, selected: false },
      "serratus-anterior-left": { intensity: 4, selected: false },
      "serratus-anterior-right": { intensity: 4, selected: false }
    },
    bodyStateBack: {
      "triceps-lateral-left": { intensity: 8, selected: true },
      "triceps-lateral-right": { intensity: 8, selected: true },
      "triceps-long-left": { intensity: 8, selected: true },
      "triceps-long-right": { intensity: 8, selected: true },
      "triceps-medial-left": { intensity: 7, selected: true },
      "triceps-medial-right": { intensity: 7, selected: true }
    },
    bullets: [
      {
        b: "1. Ângulo do Banco e Linha da Fibra",
        p: "Para ativar o feixe clavicular (porção superior), incline o banco entre 30º e 45º. Inclinações maiores transferem a tensão excessiva para o deltoide anterior."
      },
      {
        b: "2. Depressão e Adução das Escápulas",
        p: "Manter as escápulas presas no encosto estabiliza a glenoumeral, evitando o pinçamento do supraespinhal e focando o torque nos feixes peitorais."
      },
      {
        b: "3. Trajetória dos Cotovelos na Descida",
        p: "Desça os cotovelos a cerca de 60º em relação ao tronco (em formato de seta), preservando o tendão do bíceps e manguito."
      }
    ]
  },
  costas: {
    title: "Dorsais, Romboides & Trapézio",
    subtitle: "Biomecânica de Puxadas Verticais e Remadas Livres",
    tag: "Recrutamento Principal: Latíssimo do Dorso & Romboides",
    latin: "Latissimus dorsi & Rhomboidei",
    defaultView: "BACK",
    coachNote: "Conduza os cotovelos em direção aos bolsos da bermuda e deprima os ombros antes de tracionar. Isso impede que os braços roubem a carga das dorsais.",
    bodyStateFront: {
      "biceps-left": { intensity: 7, selected: false },
      "biceps-right": { intensity: 7, selected: false },
      "forearm-left": { intensity: 5, selected: false },
      "forearm-right": { intensity: 5, selected: false }
    },
    bodyStateBack: {
      "lats-upper-left": { intensity: 10, selected: true },
      "lats-upper-right": { intensity: 10, selected: true },
      "lats-mid-left": { intensity: 10, selected: true },
      "lats-mid-right": { intensity: 10, selected: true },
      "lats-lower-left": { intensity: 9, selected: true },
      "lats-lower-right": { intensity: 9, selected: true },
      "trapezius-mid-left": { intensity: 7, selected: false },
      "trapezius-mid-right": { intensity: 7, selected: false },
      "trapezius-lower-left": { intensity: 6, selected: false },
      "trapezius-lower-right": { intensity: 6, selected: false },
      "lower-back-erectors-left": { intensity: 5, selected: false },
      "lower-back-erectors-right": { intensity: 5, selected: false }
    },
    bullets: [
      {
        b: "1. Vetor de Força e Direção dos Cotovelos",
        p: "Puxadas com cotovelos colados ao tronco enfatizam o grande dorsal. Cotovelos abertos direcionam a tensão para romboides e trapézio médio."
      },
      {
        b: "2. Depressão Escapular Prévia",
        p: "Inicie o movimento trazendo as escápulas para baixo antes de flexionar os cotovelos, ativando as fibras inferiores do trapézio e latíssimo."
      },
      {
        b: "3. Conexão Mente-Músculo nas Remadas",
        p: "Foque em 'pressionar com os cotovelos para trás' em vez de puxar pela mão, minimizando a fadiga prematura dos antebraços."
      }
    ]
  },
  pernas: {
    title: "Membros Inferiores & Glúteos",
    subtitle: "Biomecânica de Agachamento, Búlgaro e Leg Press",
    tag: "Recrutamento Principal: Quadríceps, Glúteo Máximo e Isquiotibiais",
    latin: "Quadriceps femoris & Gluteus maximus",
    defaultView: "FRONT",
    coachNote: "A integridade do agachamento depende do tripé do pé (calcanhar, hálux e 5º metatarso). Joelhos acompanham a linha dos dedos sem colapso em valgo.",
    bodyStateFront: {
      "quads-left": { intensity: 10, selected: true },
      "quads-right": { intensity: 10, selected: true },
      "adductors-left": { intensity: 6, selected: false },
      "adductors-right": { intensity: 6, selected: false },
      "tibialis-anterior-left": { intensity: 5, selected: false },
      "tibialis-anterior-right": { intensity: 5, selected: false }
    },
    bodyStateBack: {
      "gluteus-maximus-left": { intensity: 10, selected: true },
      "gluteus-maximus-right": { intensity: 10, selected: true },
      "gluteus-medius-left": { intensity: 8, selected: false },
      "gluteus-medius-right": { intensity: 8, selected: false },
      "hamstrings-medial-left": { intensity: 8, selected: true },
      "hamstrings-lateral-left": { intensity: 8, selected: true },
      "hamstrings-medial-right": { intensity: 8, selected: true },
      "hamstrings-lateral-right": { intensity: 8, selected: true },
      "calves-gastroc-medial-left": { intensity: 5, selected: false },
      "calves-gastroc-lateral-left": { intensity: 5, selected: false },
      "calves-gastroc-medial-right": { intensity: 5, selected: false },
      "calves-gastroc-lateral-right": { intensity: 5, selected: false }
    },
    bullets: [
      {
        b: "1. Mobilidade de Tornozelo e Joelhos",
        p: "A dorsiflexão preservada permite agachamento profundo sem retroversão pélvica ('buttwink'), garantindo estabilidade à coluna lombar."
      },
      {
        b: "2. Posicionamento dos Pés e Torque Glúteo",
        p: "Abertura dos pés em cerca de 20º a 30º favorece o alinhamento femoral e permite torque concêntrico potente do glúteo máximo."
      },
      {
        b: "3. Distribuição de Carga no Solo",
        p: "Mantenha o calcanhar e a base do dedão ancorados ao chão durante todo o arco excêntrico e concêntrico."
      }
    ]
  },
  deltoides: {
    title: "Deltoides & Estabilização do Manguito",
    subtitle: "Biomecânica de Elevações Laterais e Desenvolvimentos",
    tag: "Recrutamento Principal: Deltoide Lateral, Anterior e Posterior",
    latin: "Deltoideus & Rotator cuff",
    defaultView: "FRONT",
    coachNote: "Elevações laterais realizadas no plano escapular (30º anteriorizado) protegem a bursa subacromial e concentram 100% da tensão mecânica no deltoide médio.",
    bodyStateFront: {
      "shoulder-side-left": { intensity: 10, selected: true },
      "shoulder-side-right": { intensity: 10, selected: true },
      "shoulder-front-left": { intensity: 8, selected: true },
      "shoulder-front-right": { intensity: 8, selected: true },
      "trapezius-upper-left": { intensity: 4, selected: false },
      "trapezius-upper-right": { intensity: 4, selected: false }
    },
    bodyStateBack: {
      "shoulder-back-left": { intensity: 10, selected: true },
      "shoulder-back-right": { intensity: 10, selected: true },
      "trapezius-upper-left": { intensity: 5, selected: false },
      "trapezius-upper-right": { intensity: 5, selected: false },
      "trapezius-mid-left": { intensity: 5, selected: false },
      "trapezius-mid-right": { intensity: 5, selected: false }
    },
    bullets: [
      {
        b: "1. Plano Escapular (30º à Frente)",
        p: "Execute a elevação lateral cerca de 30º anterior ao corpo. Isso alinha a cabeça do úmero na cavidade glenoide e elimina o impacto no supraespinhal."
      },
      {
        b: "2. Limite da Amplitude Confortável",
        p: "Elevar halteres além da linha dos ombros transfere a sobrecarga para o trapézio superior. Pare ligeiramente abaixo da linha do queixo."
      },
      {
        b: "3. Pegada Neutra e Punho Firme",
        p: "Mantenha o punho estável e o polegar sem excessiva rotação interna para evitar pinçamento do tendão umeral."
      }
    ]
  },
  core: {
    title: "Core, Reto Abdominal & Pressão Intra-Abdominal",
    subtitle: "Biomecânica de Estabilidade Lombopélvica e Força Central",
    tag: "Recrutamento Principal: Reto Abdominal, Oblíquos & Serrátil",
    latin: "Rectus abdominis & Obliquus externus",
    defaultView: "FRONT",
    coachNote: "O core funciona como um cilindro de rigidez para transmitir forças entre o chão e a barra. Treinar estabilidade anti-extensão e anti-rotação previne lesões discais.",
    bodyStateFront: {
      "abs-upper-left": { intensity: 10, selected: true },
      "abs-upper-right": { intensity: 10, selected: true },
      "abs-lower-left": { intensity: 9, selected: true },
      "abs-lower-right": { intensity: 9, selected: true },
      "obliques-left": { intensity: 8, selected: true },
      "obliques-right": { intensity: 8, selected: true },
      "serratus-anterior-left": { intensity: 6, selected: false },
      "serratus-anterior-right": { intensity: 6, selected: false }
    },
    bodyStateBack: {
      "lower-back-erectors-left": { intensity: 8, selected: true },
      "lower-back-erectors-right": { intensity: 8, selected: true },
      "lower-back-ql-left": { intensity: 7, selected: false },
      "lower-back-ql-right": { intensity: 7, selected: false }
    },
    bullets: [
      {
        b: "1. Manobra de Bracing (Pressão 360º)",
        p: "Contraia o abdômen expandindo as costelas para os lados com ar diafragmático, criando um colete natural que protege a coluna."
      },
      {
        b: "2. Controle Pélvico Neutro",
        p: "Evite tanto a hiperlordose lombar descontrolada quanto a perda precoce de curvatura durante cargas axiais elevadas."
      },
      {
        b: "3. Transferência Direta de Força",
        p: "Um core estabilizado aumenta em até 20% a força transferida no agachamento, supino e saltos desportivos."
      }
    ]
  }
};

function initBiomecanicaSelector() {
  const buttons = document.querySelectorAll(".muscle-btn");
  const titleEl = document.querySelector("#muscleTitle");
  const subtitleEl = document.querySelector("#muscleTargetSub");
  const tagEl = document.querySelector("#muscleGraphicTag");
  const latinBadge = document.querySelector("#muscleLatinBadge");
  const coachNote = document.querySelector("#muscleCoachNote");
  const bulletsEl = document.querySelector("#muscleInfoContent .muscle-bullets");
  const chartContainer = document.querySelector("#bodyMusclesChartContainer");
  const btnViewFront = document.querySelector("#btnViewFront");
  const btnViewBack = document.querySelector("#btnViewBack");

  if (!buttons.length || !titleEl || !bulletsEl || !chartContainer) return;

  let currentTarget = "peito";
  let currentView = "FRONT";
  let bodyChartInstance = null;

  // 1. Personaliza a paleta cromática do BodyMuscles para o tema WHOOP (Pulse Violet #4a53ff)
  if (window.BodyMuscles && window.BodyMuscles.INTENSITY_COLORS) {
    window.BodyMuscles.INTENSITY_COLORS[0] = "#202430"; // Inativo / Base neutra escura
    window.BodyMuscles.INTENSITY_COLORS[1] = "#282d3f";
    window.BodyMuscles.INTENSITY_COLORS[2] = "#30364e";
    window.BodyMuscles.INTENSITY_COLORS[3] = "#394172";
    window.BodyMuscles.INTENSITY_COLORS[4] = "#3b43a4";
    window.BodyMuscles.INTENSITY_COLORS[5] = "#444be0";
    window.BodyMuscles.INTENSITY_COLORS[6] = "#4a53ff"; // Pulse Violet Primário
    window.BodyMuscles.INTENSITY_COLORS[7] = "#636cff";
    window.BodyMuscles.INTENSITY_COLORS[8] = "#7c84ff";
    window.BodyMuscles.INTENSITY_COLORS[9] = "#9da3ff";
    window.BodyMuscles.INTENSITY_COLORS[10] = "#ffffff"; // Pico de recrutamento / Branco puro
  }

  // 2. Função para obter o estado atual baseado na vista
  const getBodyState = (target, view) => {
    const data = biomecanicaData[target];
    if (!data) return {};
    return view === "BACK" ? (data.bodyStateBack || {}) : (data.bodyStateFront || {});
  };

  // 3. Atualiza painel informativo lateral
  const updateInfoPanel = (data) => {
    if (!data) return;
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    if (tagEl) tagEl.textContent = data.tag;
    if (latinBadge && data.latin) latinBadge.textContent = data.latin;
    if (coachNote && data.coachNote) coachNote.textContent = `"${data.coachNote}"`;

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
  };

  // 4. Renderiza / atualiza o BodyChart
  const renderChart = () => {
    const state = getBodyState(currentTarget, currentView);

    // Atualiza botões de vista (Frente / Costas)
    if (btnViewFront && btnViewBack) {
      btnViewFront.classList.toggle("active", currentView === "FRONT");
      btnViewBack.classList.toggle("active", currentView === "BACK");
    }

    if (window.BodyMuscles && window.BodyMuscles.BodyChart) {
      if (!bodyChartInstance) {
        bodyChartInstance = new window.BodyMuscles.BodyChart(chartContainer, {
          view: currentView,
          bodyState: state,
          showViewLabel: false,
          enableTransitions: true,
          onMuscleClick: (muscleId, muscleName) => {
            if (tagEl) {
              tagEl.textContent = `Músculo Focado: ${muscleName || muscleId}`;
            }
            if (coachNote) {
              coachNote.textContent = `"O músculo ${muscleName || muscleId} recebe estímulo mecânico direcionado com alinhamento angular preciso e cadência controlada."`;
            }
          },
          onMuscleHover: (muscleId) => {
            if (muscleId && tagEl && !tagEl.dataset.locked) {
              tagEl.textContent = `Analisando: ${muscleId.replace(/-/g, " ")}`;
            } else if (!muscleId && tagEl && !tagEl.dataset.locked) {
              const d = biomecanicaData[currentTarget];
              if (d) tagEl.textContent = d.tag;
            }
          }
        });
      } else {
        bodyChartInstance.update({
          view: currentView,
          bodyState: state
        });
      }
    }
  };

  // 5. Troca de Grupo Muscular (Tabs)
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      const data = biomecanicaData[target];
      if (!data) return;

      currentTarget = target;
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Se o grupo pedir preferencialmente BACK (como costas), ajusta a vista
      if (data.defaultView) {
        currentView = data.defaultView;
      }

      updateInfoPanel(data);
      renderChart();
    });
  });

  // 6. Troca manual do Ângulo Anatômico (Frente / Costas)
  if (btnViewFront) {
    btnViewFront.addEventListener("click", () => {
      currentView = "FRONT";
      renderChart();
    });
  }

  if (btnViewBack) {
    btnViewBack.addEventListener("click", () => {
      currentView = "BACK";
      renderChart();
    });
  }

  // 7. Inicialização no carregamento
  updateInfoPanel(biomecanicaData[currentTarget]);
  renderChart();
}

/* ==========================================================================
   2.1 Player de Vídeos Curtos de Biomecânica (Análise Cinesiológica)
   ========================================================================== */
function initBiomechanicsVideoPlayer() {
  const player = document.querySelector("#bioMainVideo");
  const playBtn = document.querySelector("#bioPlayTriggerBtn");
  const muteBtn = document.querySelector("#bioMuteTriggerBtn");
  const currentLabel = document.querySelector("#bioVideoCurrentLabel");
  const clipCards = document.querySelectorAll(".bio-clip-card");

  if (!player || !playBtn) return;

  const syncPlayState = () => {
    const labelSpan = playBtn.querySelector(".play-label");
    const iconSpan = playBtn.querySelector(".play-icon");
    if (player.paused) {
      if (labelSpan) labelSpan.textContent = "Reproduzir Análise";
      if (iconSpan) iconSpan.textContent = "▶";
    } else {
      if (labelSpan) labelSpan.textContent = "Pausar";
      if (iconSpan) iconSpan.textContent = "⏸";
    }
  };

  playBtn.addEventListener("click", () => {
    if (player.paused) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }
    syncPlayState();
  });

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      player.muted = !player.muted;
      const muteIcon = muteBtn.querySelector(".mute-icon");
      if (muteIcon) {
        muteIcon.textContent = player.muted ? "🔇" : "🔊";
      }
    });
  }

  player.addEventListener("play", syncPlayState);
  player.addEventListener("pause", syncPlayState);

  clipCards.forEach((card) => {
    const handleSelect = () => {
      clipCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const src = card.dataset.videoSrc;
      const poster = card.dataset.videoPoster;
      const title = card.dataset.videoTitle;

      if (src) {
        player.src = src;
        if (poster) player.poster = poster;
        if (currentLabel && title) {
          currentLabel.textContent = `Análise Ativa: ${title}`;
        }
        player.load();
        player.play().catch(() => {});
        syncPlayState();
      }
    };

    card.addEventListener("click", handleSelect);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    });
  });
}

/* ==========================================================================
   2.2 Treino da Semana — Periodização Científica & Aplicação Prática
   ========================================================================== */
function initWorkoutOfTheWeek() {
  const tabs = document.querySelectorAll(".workout-pill-btn");
  const focusBadge = document.querySelector("#sheetFocusBadge");
  const sheetTitle = document.querySelector("#sheetTitle");
  const sheetMeta = document.querySelector("#sheetMeta");
  const listEl = document.querySelector("#workoutExercisesList");

  if (!tabs.length || !listEl || !WORKOUT_WEEK) return;

  const renderWorkout = (key) => {
    const data = WORKOUT_WEEK[key];
    if (!data) return;

    if (focusBadge) focusBadge.textContent = data.focus;
    if (sheetTitle) sheetTitle.textContent = data.name;
    if (sheetMeta) sheetMeta.textContent = data.volume;

    listEl.innerHTML = data.exercises
      .map(
        (ex) => `
        <div class="exercise-item-card">
          <div class="exercise-header">
            <span class="exercise-number">${ex.num}</span>
            <div class="exercise-titles">
              <h4>${ex.name}</h4>
              <span class="exercise-target">${ex.target}</span>
            </div>
          </div>
          <div class="exercise-metrics-bar">
            <span class="ex-metric-pill"><b>Séries:</b> ${ex.sets}</span>
            <span class="ex-metric-pill"><b>Cadência:</b> ${ex.cadence}</span>
            <span class="ex-metric-pill"><b>Intervalo:</b> ${ex.rest}</span>
          </div>
          <div class="exercise-coach-tip">
            <div class="coach-tip-header">
              <span class="tip-badge">DICA DO TIAGO // BIOMECÂNICA</span>
            </div>
            <p>${ex.tip}</p>
          </div>
        </div>
      `
      )
      .join("");
  };

  // Render inicial
  renderWorkout("a");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderWorkout(tab.dataset.workout);
    });
  });
}

/* ==========================================================================
   4. Seletor de Casos Reais & Slider Comparativo com Pointer Events
   ========================================================================== */
function initCaseStudyTabs() {
  const tabBtns = document.querySelectorAll(".case-tab-btn");
  const panels = document.querySelectorAll(".case-study-panel");
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCase = btn.dataset.case;
      if (!targetCase) return;

      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        if (panel.id === targetCase) {
          panel.classList.add("active");
          panel.removeAttribute("hidden");
        } else {
          panel.classList.remove("active");
          panel.setAttribute("hidden", "true");
        }
      });
    });
  });
}

function initComparisonSlider() {
  const wrappers = document.querySelectorAll('.comparison-slider-wrapper[data-slider="reveal"]');
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const curtain = wrapper.querySelector(".curtain-reveal-overlay");
    const sliderHandle = wrapper.querySelector(".slider-handle");
    const curtainLabel = wrapper.querySelector(".curtain-label");
    const panel = wrapper.closest(".case-study-panel");
    const quickBtns = panel ? panel.querySelectorAll(".quick-pos-btn") : [];

    if (!curtain || !sliderHandle) return;

    let isDragging = false;

    const setPosition = (pct, animate = false) => {
      // Limita de 50% (divisa central natural) a 100% (Depois revelado)
      // Nunca cobre o Antes (0% a 50%)!
      const val = Math.max(50, Math.min(100, pct));

      if (animate) {
        curtain.style.transition = "left 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
        sliderHandle.style.transition = "left 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
        setTimeout(() => {
          curtain.style.transition = "";
          sliderHandle.style.transition = "";
        }, 360);
      } else {
        curtain.style.transition = "none";
        sliderHandle.style.transition = "none";
      }

      curtain.style.left = `${val}%`;
      sliderHandle.style.left = `${val}%`;

      if (curtainLabel) {
        if (val >= 85) {
          curtainLabel.style.opacity = "0";
          curtainLabel.style.visibility = "hidden";
        } else {
          curtainLabel.style.opacity = "1";
          curtainLabel.style.visibility = "visible";
        }
      }

      // Em 98% a 100% (Ver Só Depois), oculta a manopla para manter a foto 100% limpa
      if (sliderHandle) {
        sliderHandle.style.opacity = val >= 98 ? "0" : "1";
      }

      // Sincroniza estado visual dos botões rápidos
      if (quickBtns.length) {
        quickBtns.forEach((b) => {
          const btnPos = parseFloat(b.dataset.sliderPos);
          if (Math.abs(btnPos - val) < 8) {
            b.classList.add("active");
          } else {
            b.classList.remove("active");
          }
        });
      }
    };

    const handlePointerAction = (clientX) => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setPosition(Math.max(50, Math.min(100, percentage)));
    };

    // Pointer Events — Suporta mouse, caneta e touch com precisão absoluta
    wrapper.addEventListener("pointerdown", (e) => {
      isDragging = true;
      wrapper.classList.add("is-dragging");
      try {
        wrapper.setPointerCapture(e.pointerId);
      } catch (err) {}
      handlePointerAction(e.clientX);
    });

    wrapper.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      handlePointerAction(e.clientX);
    });

    const stopDragging = (e) => {
      if (isDragging) {
        isDragging = false;
        wrapper.classList.remove("is-dragging");
        try {
          if (e && e.pointerId) {
            wrapper.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
      }
    };

    wrapper.addEventListener("pointerup", stopDragging);
    wrapper.addEventListener("pointercancel", stopDragging);
    wrapper.addEventListener("pointerleave", stopDragging);

    // Botões de Ação Rápida (100% Antes / 50% Comparação / 0% Revelado)
    if (quickBtns.length) {
      quickBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const targetPos = parseFloat(btn.dataset.sliderPos);
          setPosition(targetPos, true);
        });
      });
    }

    // Inicializa na metade (50/50)
    setPosition(50);
  });
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


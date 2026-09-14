/**
 * lead-tracker.js — Sistema de Atribuição e Tracking Cirúrgico de Leads
 * Tiago Filadelfo (TF Personal)
 *
 * Resolve a disputa de atribuição entre vendedores (SS / SDR / Closer):
 * 1. Captura parâmetros ?ss=, ?sdr=, ?ref= e UTMs da URL.
 * 2. Persiste em Cookies (30 dias) + localStorage (First-Touch & Last-Touch).
 * 3. Injeta campos ocultos no formulário de qualificação.
 * 4. Gera código de rastreamento único (ex: SS-JOAO-8492) e embutido na mensagem do WhatsApp.
 * 5. Dispara eventos para Meta Pixel e Google Analytics (se instalados).
 */

(function (window) {
  "use strict";

  const STORAGE_KEY = "tf_lead_attribution_v1";
  const COOKIE_NAME = "tf_lead_attribution";
  const ATTRIBUTION_WINDOW_DAYS = 30;
  const OFFICIAL_WHATSAPP_NUMBER = "5511963552470";

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const trackedKeys = [
      "ss",
      "sdr",
      "ref",
      "seller",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "gclid"
    ];
    const captured = {};
    trackedKeys.forEach((key) => {
      const val = params.get(key);
      if (val && val.trim() !== "") {
        captured[key] = val.trim().toLowerCase();
      }
    });
    return captured;
  }

  function setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const serialized = encodeURIComponent(JSON.stringify(value));
      document.cookie = `${name}=${serialized};expires=${date.toUTCString()};path=/;SameSite=Lax`;
    } catch (e) {
      console.warn("[LeadTracker] Falha ao gravar cookie", e);
    }
  }

  function getCookie(name) {
    try {
      const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
      if (match) {
        return JSON.parse(decodeURIComponent(match[2]));
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function loadStoredAttribution() {
    let localData = null;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localData = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      }
    } catch (e) {
      localData = null;
    }
    return getCookie(COOKIE_NAME) || localData || null;
  }

  function initTracker() {
    const currentParams = getUrlParams();
    let stored = loadStoredAttribution() || {};
    const now = new Date().toISOString();

    const currentSS =
      currentParams.ss ||
      currentParams.sdr ||
      currentParams.seller ||
      currentParams.ref ||
      null;

    // First Touch (primeiro contato na história do lead)
    if (!stored.first_touch) {
      stored.first_touch = {
        timestamp: now,
        referrer: document.referrer || "direct",
        landing_page: window.location.href,
        params: { ...currentParams }
      };
      if (currentSS) {
        stored.first_ss = currentSS;
      }
    }

    // Last Touch (atualizado se houver novos parâmetros na visita atual)
    if (Object.keys(currentParams).length > 0) {
      stored.last_touch = {
        timestamp: now,
        referrer: document.referrer || "direct",
        landing_page: window.location.href,
        params: { ...currentParams }
      };
      if (currentSS) {
        stored.active_ss = currentSS;
      }
    }

    if (!stored.active_ss) {
      stored.active_ss = stored.first_ss || "direto";
    }

    // Persiste em ambas as camadas
    setCookie(COOKIE_NAME, stored, ATTRIBUTION_WINDOW_DAYS);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      }
    } catch (e) {
      console.warn("[LeadTracker] LocalStorage indisponível", e);
    }

    return stored;
  }

  const attributionState = initTracker();

  function getActiveSS() {
    return attributionState.active_ss || "direto";
  }

  function generateTrackingCode(ssOverride) {
    const ss = (ssOverride || getActiveSS()).toUpperCase().replace(/[^A-Z0-9_-]/g, "");
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timestamp = Date.now().toString(36).slice(-3).toUpperCase();
    return `SS-${ss}-${randomHex}${timestamp}`;
  }

  function buildWhatsAppUrl(data = {}) {
    const {
      name = "",
      objective = "",
      experience = "",
      trackingCode = generateTrackingCode(),
      phone = ""
    } = data;

    const ss = getActiveSS();
    let text = `Olá Tiago! Vim pelo seu site e quero iniciar meu acompanhamento!\n\n`;

    if (name) text += `*Nome:* ${name}\n`;
    if (objective) text += `*Objetivo:* ${objective}\n`;
    if (experience) text += `*Experiência prévia:* ${experience}\n`;
    if (phone) text += `*Contato:* ${phone}\n`;

    text += `\n[Ref: ${trackingCode}]`;

    return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function trackLeadEvent(data = {}) {
    const ss = getActiveSS();
    const trackingCode = data.trackingCode || generateTrackingCode();

    // Meta Pixel (Facebook Ads)
    if (typeof window.fbq === "function") {
      try {
        window.fbq("track", "Lead", {
          content_name: "Consultoria Tiago Filadelfo",
          content_category: data.objective || "geral",
          ss_attribution: ss,
          tracking_code: trackingCode
        });
      } catch (e) {
        console.warn("[LeadTracker] Falha no disparo Meta Pixel", e);
      }
    }

    // Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "generate_lead", {
          event_category: "Formulário",
          event_label: ss,
          ss_id: ss,
          tracking_code: trackingCode,
          lead_objective: data.objective || "geral"
        });
      } catch (e) {
        console.warn("[LeadTracker] Falha no disparo GA4", e);
      }
    }

    console.info(`[LeadTracker] Lead registrado: ${trackingCode} | Atribuído a: ${ss}`);
  }

  function autoPopulateForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const ss = getActiveSS();
    const params = attributionState.last_touch?.params || attributionState.first_touch?.params || {};

    const setHidden = (name, value) => {
      let input = form.querySelector(`input[name="${name}"]`);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        form.appendChild(input);
      }
      input.value = value || "";
    };

    setHidden("ss_id", ss);
    setHidden("utm_source", params.utm_source || "");
    setHidden("utm_campaign", params.utm_campaign || "");
    setHidden("utm_medium", params.utm_medium || "");
    setHidden("utm_content", params.utm_content || "");
    setHidden("attribution_json", JSON.stringify(attributionState));
  }

  window.LeadTracker = {
    getAttribution: () => attributionState,
    getActiveSS,
    generateTrackingCode,
    buildWhatsAppUrl,
    trackLeadEvent,
    autoPopulateForm,
    OFFICIAL_WHATSAPP_NUMBER
  };
})(window);

/**
 * content.js — Conteúdo centralizado e editável do portfólio
 * Tiago Filadelfo (TF Personal)
 *
 * Edite apenas este arquivo para ajustar galeria, vídeos e prints de
 * depoimentos. Os textos longos de seção permanecem no index.html (SEO).
 */

export const SITE = {
  title: "Tiago Filadelfo | Treinamento e Educação Física",
  whatsappNumber: "5511963552470",
  whatsappDisplay: "(11) 96355-2470",
  instagram: "https://www.instagram.com/reel/DIy91aMOAVY/?igsh=YmJja3lrOHRsOW4y",
  url: "https://landing-page-tiago-eta.vercel.app/"
};

/* Galeria multimídia de atividades reais — renderizada em #galleryGrid */
export const GALLERY = [
  {
    src: "assets/futebol-comunidade.jpeg",
    alt: "Atividade com crianças no futebol comunitário",
    kicker: "Iniciação Esportiva",
    title: "Base & Formação"
  },
  {
    src: "assets/futebol-conquista.jpeg",
    alt: "Equipe celebrando conquista esportiva comunitária",
    kicker: "Espírito de Equipe",
    title: "Celebração Coletiva"
  },
  {
    src: "assets/futebol-torcida.jpeg",
    alt: "Torcida vibrando no estádio e na comunidade",
    kicker: "Pertencimento Social",
    title: "Cultura Esportiva"
  },
  {
    src: "assets/futebol-rua.jpeg",
    alt: "Vivência de movimento e esporte de rua",
    kicker: "Movimento Autêntico",
    title: "Espaço Público"
  },
  {
    src: "assets/futebol-paisagem.jpeg",
    alt: "Vista da prática esportiva comunitária ao ar livre",
    kicker: "Campo & Comunidade",
    title: "Raízes do Movimento"
  }
];

/* Prints reais dos depoimentos — vinculados aos cards via data-testimonial-key */
export const TESTIMONIAL_PRINTS = {
  lary: {
    src: "assets/depoimento-lary.png",
    alt: "Print do relato de emagrecimento da aluna Lary Uilliana"
  },
  cassia: {
    src: "assets/depoimento-cassia.jpg",
    alt: "Print do relato de evolução da aluna Cássia"
  },
  ana: {
    src: "assets/depoimento-ana.jpg",
    alt: "Print do relato de 8 meses de acompanhamento da aluna Ana Couto"
  }
};

/* Estado inicial e metadados do vídeo documental */
export const VIDEO = {
  poster: "assets/futebol-comunidade.jpeg",
  src: "assets/video-futebol.mp4",
  pausedLabel: "▶ Reproduzir",
  playingLabel: "⏸ Pausar"
};
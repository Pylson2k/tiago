# Inventário de mídia

Inventário factual dos arquivos presentes em `assets/` em 15/09/2026. Os tamanhos
originais devem ser tratados por Astro Assets/Sharp antes do deploy.

## Triagem

| Arquivo                  | Uso                | Observação                                                |
| ------------------------ | ------------------ | --------------------------------------------------------- |
| `gabriel-evolucao.jpeg`  | Caso Gabriel       | Composição estática; requer autorização; não usar slider. |
| `tiago-portrait.webp`    | Retrato/hero       | Confirmar foto definitiva.                                |
| `tiago-training.webp`    | Contexto de treino | Confirmar enquadramento e autorização.                    |
| `tiago-apresentacao.mp4` | Apresentação       | Gerar poster e versão comprimida.                         |
| `video-futebol.mp4`      | Prática esportiva  | Confirmar direito de imagem de todas as pessoas.          |

## Não publicar automaticamente

`antes-depois-01.jpeg`, `antes-depois-02.jpeg`, `caso1-antes.jpeg`,
`caso1-depois.jpeg`, `caso2-antes.jpeg`, `caso2-depois.jpeg`, `depoimento-*`
podem conter imagem, nome, usuário ou conversa de terceiros. Exigem autorização,
anonimização e revisão editorial.

`estudo-*.jpeg` e `futebol-*.jpeg` exigem validação de contexto, instituição,
local e direito de imagem. `certificado-pendente.pdf` não deve aparecer.

## Otimização

- Gerar AVIF/WebP, `srcset` e poster de vídeo.
- Não enviar `logo-tf.png` original (aprox. 5,8 MB) ao navegador.
- Remover metadados EXIF e informações pessoais antes do deploy.
- Lazy-load fora do primeiro viewport e respeitar `prefers-reduced-motion`.

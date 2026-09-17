# Inventário de mídia

Inventário factual dos arquivos presentes em `assets/` em 15/09/2026. Os tamanhos
originais devem ser tratados por Astro Assets/Sharp antes do deploy.

## Triagem

| Arquivo                        | Uso                | Observação                                                |
| ------------------------------ | ------------------ | --------------------------------------------------------- |
| `gabriel-evolucao.jpeg`        | Caso Gabriel       | Composição estática; requer autorização; não usar slider. |
| `tiago-portrait.webp`          | Retrato/hero       | Confirmar foto definitiva.                                |
| `tiago-training.webp`          | Contexto de treino | Confirmar enquadramento e autorização.                    |
| `tiago-portrait-editorial.png` | Arquivo legado     | Variante anterior; preservada para comparação, não é o slot atual. |
| `tiago-training-editorial.png` | Arquivo legado     | Variante anterior; preservada para comparação, não é o slot atual. |
| `tiago-hero-composition.webp`  | Hero               | Nova composição gerada com direção editorial 16:9; Tiago à direita e área negativa à esquerda. |
| `tiago-about-composition.webp` | Sobre/About       | Nova composição gerada 4:5; retrato distinto do Hero com área negativa para texto. |
| `tiago-training-detail.webp`   | Serviços/treino   | Nova composição gerada 3:2 para cards de programas, com foco na execução. |
| `gabriel-before.webp`          | Caso Gabriel       | Recorte inicial independente, sem alterar o resultado.    |
| `gabriel-after.webp`           | Caso Gabriel       | Recorte posterior independente, sem alterar o resultado.  |
| `gabriel-before-restored.webp` | Caso Gabriel       | Restauração fotográfica não generativa; preserva identidade e resultado. |
| `gabriel-after-restored.webp`  | Caso Gabriel       | Restauração fotográfica não generativa; preserva identidade e resultado. |
| `caso1-antes-restored.webp`    | Caso 01            | Upscale e tratamento tonal controlado, sem alteração corporal. |
| `caso1-depois-restored.webp`   | Caso 01            | Upscale e tratamento tonal controlado, sem alteração corporal. |
| `caso2-antes-restored.webp`    | Caso 02            | Upscale e tratamento tonal controlado, sem alteração corporal. |
| `caso2-depois-restored.webp`   | Caso 02            | Upscale e tratamento tonal controlado, sem alteração corporal. |
| `tiago-apresentacao.mp4`       | Apresentação       | Gerar poster e versão comprimida.                         |
| `video-futebol.mp4`            | Prática esportiva  | Confirmar direito de imagem de todas as pessoas.          |

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

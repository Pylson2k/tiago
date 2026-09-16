import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const editorialStatus = z.enum(['published', 'draft', 'needs-review']);
const imageRef = z
  .string()
  .regex(/^\/?assets\/[\wÀ-ÿ(). _-]+$/, 'Use um caminho relativo a /assets.');
const baseEditorial = {
  status: editorialStatus.default('needs-review'),
  updatedAt: z.coerce.date(),
};

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    ...baseEditorial,
    name: z.string().min(2),
    role: z.string().min(2),
    headline: z.string().min(10),
    summary: z.string().min(20),
    portrait: imageRef,
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  }),
});
const service = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    ...baseEditorial,
    id: z.string().min(2),
    title: z.string().min(2),
    summary: z.string().min(20),
    audience: z.string().min(10),
    steps: z.array(z.string().min(3)).min(2),
    ctaLabel: z.string().min(2),
  }),
});
const resultCase = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    ...baseEditorial,
    id: z.string().min(2),
    title: z.string().min(2),
    category: z.string().min(2),
    summary: z.string().min(20),
    challenge: z.string().min(20),
    approach: z.array(z.string().min(10)).min(2),
    observedOutcome: z.string().min(20),
    image: imageRef,
    imageAlt: z.string().min(20),
    mediaTreatment: z.enum(['static-composite', 'separate-before-after']),
    disclaimer: z.string().min(20),
  }),
});
const testimonial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    ...baseEditorial,
    id: z.string().min(2),
    quote: z.string().min(20),
    attribution: z.string().min(2),
    consent: z.enum(['verified', 'needs-consent']),
    sourceAsset: imageRef.optional(),
  }),
});
const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    ...baseEditorial,
    id: z.string().min(2),
    title: z.string().min(5),
    excerpt: z.string().min(20),
    topic: z.enum(['biomecânica', 'treino', 'educação-física']),
    body: z.string().min(40),
    sourceNote: z.string().min(10),
  }),
});

export const collections = {
  profile,
  services: service,
  cases: resultCase,
  testimonials: testimonial,
  articles: article,
};
export type EditorialStatus = 'published' | 'draft' | 'needs-review';

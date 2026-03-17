import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['zh', 'en']),
    category: z.enum(['books', 'apps', 'music', 'gear', 'services']),
    rating: z.number().min(0).max(5).optional(),
    summary: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['zh', 'en']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { reviews, writing };

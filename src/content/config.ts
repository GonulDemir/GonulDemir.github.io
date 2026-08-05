import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    lang: z.enum(['tr', 'en']),
    category: z.enum([
      'optoelectronics-optics',
      'emc-noise-management'
    ]),
    subcategory: z.enum([
      'optical-system-design',
      'astronomy-space',
      'sensor-applications',
      'pcb-design-shielding',
      'grounding-cabling',
      'robotics-emc'
    ]),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    ogImage: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lang: z.enum(['tr', 'en']),
    technologies: z.array(z.string()),
    featured: z.boolean().default(false),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    createdDate: z.string().optional(),
    author: z.string().optional(),
    category: z.enum([
      'analog-design-power-electronics',
      'astronomy-astrophysics-space-science',
      'bio-inspired-sensors-robotics',
      'electromagnetic-compatibility',
      'optical-sensing-system-design',
      'product-verification-certification',
      'free-zone'
    ]),
    subcategory: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    ogImage: z.string().optional(),
    heroImage: z.string().optional(),
    sourceUrl: z.string().optional(),
    language: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.string().optional(),
    technologies: z.array(z.string()),
    featured: z.boolean().default(false),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};

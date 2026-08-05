Hazırlanan PRD doğrultusunda, Antigravity IDE üzerinde doğrudan geliştirme ve kod üretimi yapabilmeniz için hazırlanan teknik SPEC (Technical Specification) dokümanı aşağıdadır.

---

# Technical Specification (SPEC): Gönül Demir R&D Portfolio & Blog

## 1. Sistem ve Mimari Genel Bakış

* **Framework:** Astro 7.x (SSG - Static Site Generation)
* **Dil & Runtime:** TypeScript (Strict Mode), Node.js v20.20.2
* **Stil & Tasarım Sistemleri:** Tailwind CSS v4.x, `@tailwindcss/typography`
* **İçerik İşleme:** Astro Content Collections, `@astrojs/mdx`
* **Matematik & Kod İşleme:** `remark-math`, `rehype-katex`, `katex`, Shiki (Dahili Astro syntax highlighter)
* **Uluslararasılaştırma (i18n):** Astro Native i18n Routing (`tr` varsayılan, `en` ikincil)
* **Dağıtım (Deployment):** GitHub Actions -> GitHub Pages (Custom Domain)

---

## 2. Proje Dizin Yapısı (Directory Structure)

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Actions boru hattı
├── public/
│   ├── favicon.svg
│   ├── cv-gonul-demir-tr.pdf
│   ├── cv-gonul-demir-en.pdf
│   └── og-default.png
├── src/
│   ├── assets/                 # Optimize edilecek görseller
│   ├── components/
│   │   ├── Header.astro        # Navigasyon, dil & tema değiştirici
│   │   ├── Footer.astro        # Telif & sosyal bağlantılar
│   │   ├── ThemeToggle.astro   # Light/Dark mode istemci betiği
│   │   ├── LanguagePicker.astro# TR/EN dil anahtarı
│   │   ├── ArticleCard.astro   # Blog kartı bileşeni
│   │   ├── ProjectCard.astro   # Proje vitrin kartı
│   │   ├── ShareLinkedIn.astro # LinkedIn paylaşım butonu
│   │   ├── SearchBar.astro     # Makale içi arama istemci betiği
│   │   └── KaTeXHead.astro     # Matematiksel stil yükleyici
│   ├── content/
│   │   ├── config.ts           # Content Collections Zod şeması
│   │   ├── blog/               # Markdown/MDX içerik dosyaları
│   │   │   ├── tr/
│   │   │   └── en/
│   │   └── projects/           # Ar-Ge projeleri verisi
│   ├── i18n/
│   │   ├── ui.ts               # Dil bazlı sabit metinler
│   │   └── utils.ts            # Rotaya göre dil algılama yardımcıları
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Ana HTML, SEO & Meta etiketleri
│   │   └── BlogPostLayout.astro# Makale okuma sayfası düzeni
│   ├── pages/
│   │   ├── index.astro         # Kök yönlendirme (/tr/'ye redirect)
│   │   ├── tr/
│   │   │   ├── index.astro
│   │   │   ├── hakkimda.astro
│   │   │   ├── makaleler/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── projeler.astro
│   │   │   └── iletisim.astro
│   │   └── en/
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── articles/
│   │       │   ├── index.astro
│   │       │   └── [slug].astro
│   │       ├── projects.astro
│   │       └── contact.astro
│   └── styles/
│       └── global.css          # Tailwind direktifleri ve KaTeX stilleri
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json

```

---

## 3. İçerik Şeması ve Veri Modeli (Content Collections Spec)

Static kategorilerin strict veri doğrulaması için `src/content/config.ts` tanımı:

```typescript
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

```

---

## 4. Konfigürasyon Dosyaları

### 4.1 `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://gonuldemir.com', // Ya da github.io adresi
  i18n: {
    defaultLocale: 'en',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  }
});

```

### 4.2 `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          cardDark: '#1e293b',
          light: '#f8fafc',
          cardLight: '#ffffff',
          accent: '#2563eb'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

```

---

## 5. UI &UX Bileşen Özellikleri

### 5.1 Dark/Light Mode Engine (`ThemeToggle.astro`)

* Sitede parlamayı önlemek için HTML yüklenmeden inline `<script>` ile `localStorage` kontrol edilir.
* `dark` sınıfı `<html>` etiketine eklenir veya çıkarılır.

### 5.2 Arama ve Filtreleme (`SearchBar.astro`)

* İstemci tarafında çalışan hafif JavaScript ile `blog` koleksiyonu başlık ve özetlerinde arama yapar.
* Kategori ve alt kategori seçildiğinde sadece ilgili slug'a sahip kartları görünür kılar (`display: none` / `block` geçişi).

### 5.3 LinkedIn Paylaşım Bileşeni (`ShareLinkedIn.astro`)

```astro
---
const { title, url } = Astro.props;
const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
---
<a href={shareUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-[#0a66c2] text-white rounded hover:opacity-90 transition-opacity">
  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
  <span>LinkedIn'de Paylaş</span>
</a>

```

---

## 6. Otomatik Dağıtım Boru Hattı (`.github/workflows/deploy.yml`)

Antigravity ortamında projeye eklenecek olan CI/CD YAML tanımı:

```yaml
name: Deploy Astro Site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

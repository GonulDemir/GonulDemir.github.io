# Product Requirements Document (PRD): Gönül Demir - Personal R&D Engineering Portfolio & Blog

## 1. Proje Özeti ve Hedefler

* **Hedef:** 15 yıllık Elektronik Ar-Ge tecrübesine sahip Senior Electronics R&D & Product Engineer Gönül Demir için LinkedIn içeriklerinin, teknik projelerinin ve makalelerinin sergilendiği, işverenlerin ilgisini çekecek yüksek performanslı, iki dilli (Türkçe & İngilizce) kişisel web sitesi.
* **Mimarisi:** Astro Framework + Markdown/MDX + Tailwind CSS.
* **Dağıtım:** GitHub Pages (CI/CD Otomasyonu) + Özel Alan Adı (Custom Domain).
* **Temel Hedef:** Yıllarca bakım gerektirmeyen, sunucusuz (serverless), ışık hızında açılan, SEO uyumlu ve minimalist mühendislik odaklı yapı.

---

## 2. Teknik Altyapı ve Teknolojiler

* **Framework:** Astro 7.x (Static Site Generation - SSG)
* **CSS Framework:** Tailwind CSS (Minimalist, Tipografi Odaklı UI)
* **İçerik Yönetimi:** Astro Content Collections (Strict Schema)
* **Çoklu Dil (i18n):** Astro Built-in i18n (`/tr/` ve `/en/` rotaları)
* **Matematiksel Formül Desteği:** `remark-math` & `rehype-katex` (LaTeX işleme)
* **Kod Renklendirme:** Shiki (C/C++, Verilog, Python, Assembly kod blokları için varsayılan tema desteği)
* **Dağıtım:** GitHub Actions (`.github/workflows/deploy.yml`) -> GitHub Pages

---

## 3. Bilgi Mimarisi ve Gezinme (Navigation)

### 3.1 Dil ve Rotalar

* **Türkçe (Varsayılan):** `/tr/`, `/tr/hakkimda`, `/tr/makaleler`, `/tr/projeler`, `/tr/iletisim`
* **İngilizce:** `/en/`, `/en/about`, `/en/articles`, `/en/projects`, `/en/contact`

### 3.2 Kategori Hiyerarşisi (Makaleler / Blog)

Astro Content Collections üzerinde dinamik filtreleme için aşağıdaki kategoriler ve alt kategoriler tanımlanacaktır:

1. **Optoelektronik & Optik** (`optoelectronics-optics`)
* Optik Sistem Tasarımı (`optical-system-design`)
* Astronomi & Uzay (`astronomy-space`)
* Sensör Uygulamaları (Biyomedikal & Tarım) (`sensor-applications`)


2. **EMC & Gürültü Yönetimi** (`emc-noise-management`)
* PCB Tasarımı & Ekranlama (`pcb-design-shielding`)
* Topraklama & Kablolama (`grounding-cabling`)
* Robotik & EMC (`robotics-emc`)



---

## 4. Sayfa Düzenleri ve Bileşen Gereksinimleri

### 4.1 Header (Üst Menü)

* **Logo/Başlık:** "Gönül Demir"
* **Unvan (Sub-header):** Senior Electronics R&D & Product Engineer
* **Menü Bağlantıları:** Ana Sayfa, Hakkımda, Makaleler (Açılır Alt Menü / Dropdown Filtreli), Projeler, İletişim
* **Açılır Menü (Makaleler):**
* Optoelektronik & Optik -> (Optik Sistem Tasarımı, Astronomi & Uzay, Sensör Uygulamaları)
* EMC & Gürültü Yönetimi -> (PCB Tasarımı & Ekranlama, Topraklama & Kablolama, Robotik & EMC)


* **Kontroller:**
* Dil Değiştirici (TR / EN)
* Tema Geçiş Butonu (Dark / Light Mode Toggle)



### 4.2 Ana Sayfa (Home Page)

* **Hero Bölümü:**
* İsim ve Tam Unvan: *Gonul Demir - Senior Electronics R&D & Product Engineer | Hardware Design | Sensor Systems | Optoelectronics | EMC/EMI*
* 2-3 cümlelik kısa teknik özet.
* İletişim Butonları: `LinkedIn`, `GitHub`, `E-posta` ve **`CV İndir (PDF)`** butonu.


* **Öne Çıkan Projeler (Vitrin):** En önemli 3 Ar-Ge projesinin kart formatında gösterimi.
* **Son Makaleler:** En son eklenen 3 teknik blog yazısı (tarih, okuma süresi ve kategori etiketleri ile).

### 4.3 Makaleler (Blog Listesi & Detay Sayfası)

* **Liste Sayfası:**
* Canlı Arama Çubuğu (Başlık ve içerik içi arama).
* Kategori ve Alt Kategori Filtreleme Butonları.
* Makale Kartı: Başlık, Özet, Yayın Tarihi, Tahmini Okuma Süresi, Kategori Etiketi.


* **Detay Sayfası (`/makaleler/[slug]`):**
* LaTeX Desteği: Satır içi `$E = mc^2$` ve blok `$$...$$` matematik denklemlerinin kusursuz gösterimi.
* Kod Blokları: Satır numaralı, kopyalama butonlu syntax highlighting.
* Sosyal Paylaşım: **LinkedIn Paylaş Butonu** (Makale bağlantısını paylaşır).
* İlgili Makaleler / Benzer Yazılar bölümü.



### 4.4 Hakkımda & Özgeçmiş (About)

* 15 yıllık Ar-Ge deneyimi kronolojisi.
* Uzmanlık Alanları: Hardware Design, Optoelectronics, EMC/EMI, Sensor Systems.
* İndirilebilir güncel PDF CV bağlantısı.

### 4.5 İletişim (Contact)

* Doğrudan E-posta bağlantısı (`mailto:`).
* LinkedIn ve GitHub profillerine yönlendirme ikonları.

---

## 5. Tasarım ve UI/UX Özellikleri

* **Referans Stil:** `hans-rosenberg.com` tarzı ultra-minimalist, tipografi ve içerik odaklı layout.
* **Tema:**
* Dark / Light mode desteği (`localStorage` tabanlı tercih hatırlama).
* Dark Mode: Derin siyah/koyu gri arka plan (`#0f172a`), yüksek okunabilirlikli açık metinler.
* Light Mode: Temiz beyaz/açık gri arka plan (`#f8fafc`), keskin monokrom metinler.


* **Tipografi:** Kod blokları için `JetBrains Mono` veya `Fira Code`; gövde metinleri için `Inter` veya `Geist`.

---

## 6. SEO, Analitik ve Sosyal Medya Entegrasyonları

* **Open Graph (OG) & Twitter Cards:**
* LinkedIn veya diğer platformlarda paylaşıldığında otomatik kapak görseli, dinamik başlık ve açıklama çıkaran meta etiket sistemi.


* **Analitik:** Google Analytics (GA4) entegrasyonu (Astro Script veya Google Tag Manager ile).
* **Sitemap & RSS:** `@astrojs/sitemap` ve `@astrojs/rss` eklentileri ile arama motorlarına ve okuyuculara otomatik güncel besleme sağlama.

---

## 7. Veri Yapısı (Astro Content Schema)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lang: z.enum(['tr', 'en']),
    category: z.enum(['optoelectronics-optics', 'emc-noise-management']),
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
  }),
});

export const collections = {
  'blog': blogCollection,
};

```

---

## 8. Geliştirme ve Dağıtım Adımları (Antigravity Komutları)

1. **Astro Projesini Başlat:**
`npm create astro@latest -- --template minimal`
2. **Gerekli Eklentileri Kur:**
`npm install @astrojs/tailwind tailwindcss @astrojs/mdx remark-math rehype-katex katex`
3. **i18n ve İçerik Şemasını Yapılandır:** `astro.config.mjs` ve `src/content/config.ts` dosyalarını PRD uyarınca oluştur.
4. **Build & GitHub Actions Test:** `.github/workflows/deploy.yml` dosyasını ekleyerek GitHub Pages entegrasyonunu tamamla.

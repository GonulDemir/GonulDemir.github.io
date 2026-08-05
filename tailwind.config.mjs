import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          cardDark: '#1e293b',
          light: '#f8fafc',
          cardLight: '#ffffff',
          accent: '#2563eb',
          accentHover: '#1d4ed8',
          textDark: '#f1f5f9',
          textLight: '#0f172a',
          mutedDark: '#94a3b8',
          mutedLight: '#64748b',
          borderDark: '#334155',
          borderLight: '#e2e8f0'
        }
      }
    },
  },
  plugins: [
    typography,
  ],
};

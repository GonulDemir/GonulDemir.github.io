import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Add a visible attribution below images archived from LinkedIn articles.
function rehypeLinkedInImageSources() {
  return (tree) => {
    const visit = (node) => {
      if (!node || !node.children) return;

      for (const child of node.children) {
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children?.length === 1 &&
          child.children[0]?.type === 'element' &&
          child.children[0].tagName === 'img' &&
          typeof child.children[0].properties?.src === 'string' &&
          child.children[0].properties.src.startsWith('/images/articles/')
        ) {
          child.tagName = 'figure';
          child.properties = { className: ['article-figure', 'my-6'] };
          child.children.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {
              className: ['mt-2', 'text-center', 'text-xs', 'text-slate-500', 'dark:text-slate-400']
            },
            children: [{ type: 'text', value: 'Source: LinkedIn publication' }]
          });
        } else {
          visit(child);
        }
      }
    };

    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://gonuldemir.com',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeLinkedInImageSources],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  }
});

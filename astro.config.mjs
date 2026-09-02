import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Add a visible attribution below images archived from LinkedIn articles.
function rehypeLinkedInImageSources() {
  return (tree) => {
    const textContent = (node) => {
      if (!node) return '';
      if (node.type === 'text') return node.value || '';
      return (node.children || []).map(textContent).join('');
    };

    const sourceFrom = (value) => {
      const match = value.match(/source\s*:?\s*(.*)$/i);
      return match ? `Source: ${match[1].trim()}` : '';
    };

    const visit = (node) => {
      if (!node || !node.children) return;

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children?.length === 1 &&
          child.children[0]?.type === 'element' &&
          child.children[0].tagName === 'img' &&
          typeof child.children[0].properties?.src === 'string' &&
          child.children[0].properties.src.startsWith('/images/articles/')
        ) {
          const image = child.children[0];
          const altSource = sourceFrom(image.properties.alt || '');
          let captionChildren = altSource
            ? [{ type: 'text', value: altSource }]
            : null;
          const following = node.children[index + 1];
          const followingSource = following?.type === 'element' && following.tagName === 'p'
            ? sourceFrom(textContent(following))
            : '';
          if (!captionChildren && followingSource) {
            captionChildren = following.children;
          }
          if (captionChildren && followingSource) {
            node.children.splice(index + 1, 1);
          }

          if (!captionChildren) continue;

          child.tagName = 'figure';
          child.properties = { className: ['article-figure', 'my-6'] };
          child.children.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {
              className: ['mt-2', 'text-center', 'text-xs', 'text-slate-500', 'dark:text-slate-400']
            },
            children: captionChildren
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
  site: 'https://gonuldemir.github.io',
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

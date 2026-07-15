import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
    prerender({
      routes: [
        '/', '/about', '/clients', '/case-studies', '/blog', '/contact', '/careers',
        '/services/website-development', '/services/social-media-marketing', '/services/performance-marketing',
        '/services/meta-ads', '/services/google-ads', '/services/google-seo',
        '/services/branding', '/services/review-scanner', '/services/content-creation'
      ],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 2000,
        inject: { prerendered: true }
      })
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

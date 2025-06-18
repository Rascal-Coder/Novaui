import { URL, fileURLToPath } from 'node:url';

import React from '@vitejs/plugin-react';
import fg from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// import pkg from './package.json';

export default defineConfig(() => {
  const components = fg.sync('src/components/**/index.ts');
  const names = components.map(component => {
    return component.replace('/index.ts', '').replace('src/components/', '');
  });

  const entry: Record<string, string> = {};
  const manualChunks: Record<string, string[]> = {};

  names.forEach(name => {
    entry[`components/${name}/index`] = fileURLToPath(new URL(`src/components/${name}/index.ts`, import.meta.url));
    manualChunks[`components/${name}/index`] = [`src/components/${name}/index.ts`];
  });

  const external = ['react', 'react-dom', 'react/jsx-runtime'];
  return {
    plugins: [
      React({
        // 优化 React 插件配置
        jsxRuntime: 'automatic',
        jsxImportSource: 'react'
      }),
      dts({
        bundledPackages: ['@novaui/primitives'],
        include: 'src/**/*'
      })
    ],
    build: {
      lib: {
        name: 'nova-ui',
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.mjs`,
        entry: {
          ...entry,
          index: fileURLToPath(new URL('src/index.ts', import.meta.url))
        }
      },
      rollupOptions: {
        external,
        output: {
          manualChunks: (id, meta) => {
            const info = meta.getModuleInfo(id);
            if (!info?.code) {
              return null;
            }

            const moduleChunks = id.match(/[/\\]node_modules[/\\]\.pnpm[/\\](.*?)[/\\]/);
            if (moduleChunks) {
              return `vendor/${moduleChunks[1]}`;
            }

            const componentsChunks = id.match(/[/\\]src[/\\]components[/\\](.*?)[/\\]/);
            if (componentsChunks) {
              return `components/${componentsChunks[1]}/index`;
            }

            const variantsChunks = id.match(/[/\\]variants[/\\]([\w-]+)/);
            if (variantsChunks) {
              return `variants/${variantsChunks[1]}`;
            }

            const primitivesComponentsChunks = id.match(/[/\\]primitives[/\\]([\w-]+)[/\\]([\w-]+)[/\\]([\w-]+)/);
            if (primitivesComponentsChunks) {
              return `primitives/${primitivesComponentsChunks[3]}`;
            }

            const primitivesChunks = id.match(/[/\\]primitives[/\\]([\w-]+)[/\\]([\w-]+)/);
            if (primitivesChunks && primitivesChunks[2] !== 'index') {
              return `primitives/${primitivesChunks[2]}`;
            }

            const otherChunks = id.match(/[/\\]src[/\\](.*?)[/\\]/);

            if (otherChunks) {
              return `${otherChunks[1]}`;
            }

            return null;
          }
        }
      }
    }
  };
});

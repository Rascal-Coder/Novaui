import { URL, fileURLToPath } from 'node:url';

import React from '@vitejs/plugin-react';
import fg from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

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
  const external = [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    // 确保 React 相关包被正确外部化
    'react',
    'react-dom',
    'react/jsx-runtime'
  ];
  return {
    plugins: [
      React({
        // 优化 React 插件配置
        jsxRuntime: 'automatic',
        jsxImportSource: 'react'
      }),
      dts({ cleanVueFileName: true, include: 'src/**/*' })
    ],
    build: {
      minify: false,
      target: 'esnext',
      sourcemap: true,
      lib: {
        name: 'nova-ui-primitives',
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
          manualChunks: {
            ...manualChunks,
            index: ['src/index.ts']
          }
        }
      }
    }
  };
});

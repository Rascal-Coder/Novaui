import { interopDefault } from '../shared';
import type { FlatConfigItem } from '../types';

export async function createImportConfig(overrides: Record<string, string> = {}) {
  const pluginImport = await interopDefault(import('eslint-plugin-import-x'));

  const externalUi = [
    'vite',
    'vite/**',
    'vitepress',
    'vitepress/**',
    '@vitejs/**',
    'vite-plugin-**',
    'unocss',
    '@unocss/**',
    'unplugin-**',
    'pinia',
    'novaui',
    '@novaui/**'
  ];
  const externalReact = ['react', 'react-dom', 'react-router-dom', 'react-query', 'react-i18next', 'antd'];
  const externalCommon = ['axios', 'es-toolkit', 'date-fns', 'dayjs', 'lodash-es', '@tanstack/**', 'zod', 'valibot'];
  const internals = [
    '@/constant',
    '@/constant/**',
    '@/constants',
    '@/constants/**',
    '@/config',
    '@/config/**',
    '@/configs',
    '@/configs/**',
    '@/setting',
    '@/setting/**',
    '@/settings',
    '@/settings/**',
    '@/plugin',
    '@/plugin/**',
    '@/plugins',
    '@/plugins/**',
    '@/layouts',
    '@/views',
    '@/components',
    '@/router',
    '@/service',
    '@/service/**',
    '@/services',
    '@/services/**',
    '@/api',
    '@/api/**',
    '@/apis',
    '@/apis/**',
    '@/store',
    '@/store/**',
    '@/context',
    '@/context/**',
    '@/composables',
    '@/composables/**',
    '@/hooks',
    '@/hooks/**',
    '@/directives',
    '@/shared',
    '@/shared/**',
    '@/utils',
    '@/utils/**',
    '@/styles',
    '@/style',
    '@/assets',
    '@/assets/**',
    '@/**'
  ];

  const externalGroups = [...externalUi, ...externalReact, ...externalCommon].map(item => ({
    group: 'external' as const,
    pattern: item,
    position: 'before' as const
  }));

  const internalGroups = internals.map(item => ({
    group: 'internal' as const,
    pattern: item,
    position: 'before' as const
  }));

  const configs: FlatConfigItem[] = [
    {
      plugins: {
        import: pluginImport
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'never',
            pathGroups: [...externalGroups, ...internalGroups],
            pathGroupsExcludedImportTypes: []
          }
        ],
        ...overrides
      }
    }
  ];

  return configs;
}

import { presetNovaui } from '@novaui/unocss-preset';
import { defineConfig, presetTypography, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetTypography(), presetAnimations(), presetNovaui()]
});

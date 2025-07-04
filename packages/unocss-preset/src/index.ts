import type { Preset } from '@unocss/core';
import type { Theme } from 'unocss/preset-mini';

import { generateCSSVars, generateGlobalStyles } from './generate';
import themes from './theme.json';
import type { PresetShadcnOptions, ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions } from './types';

export const builtinColors = themes.map(theme => theme.name) as ThemeConfigColor[];
export const builtinColorMap = themes.reduce(
  (acc, theme) => {
    acc[theme.name as ThemeConfigColor] = theme.cssVars.light.primary;
    return acc;
  },
  {} as Record<ThemeConfigColor, string>
);
export const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const;

/**
 * The UnoCSS preset for Novaui.
 *
 * @param options - The options for the preset.
 * @param globals - Whether to generate global variables, like *.border-color, body.color, body.background.
 */
export function presetNovaui(options: PresetShadcnOptions = {}, globals = true): Preset<Theme> {
  return {
    name: 'unocss-preset-novaui',
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down {
            from {
              height: 0;
              opacity: 0;
              transform: translateZ(0);
            }
            to {
              height: var(--nova-accordion-content-height);
              opacity: 1;
              transform: translateZ(0);
            }
          }
          @keyframes shadcn-up {
            from {
              height: var(--nova-accordion-content-height);
              opacity: 1;
              transform: translateZ(0);
            }
            to {
              height: 0;
              opacity: 0;
              transform: translateZ(0);
            }
          }
          @keyframes shadcn-collapsible-down {
            from {
              height: 0;
              opacity: 0;
              transform: translateZ(0);
            }
            to {
              height: var(--nova-collapsible-content-height);
              opacity: 1;
              transform: translateZ(0);
            }
          }
          @keyframes shadcn-collapsible-up {
            from {
              height: var(--nova-collapsible-content-height);
              opacity: 1;
              transform: translateZ(0);
            }
            to {
              height: 0;
              opacity: 0;
              transform: translateZ(0);
            }
          }

          ${generateCSSVars(options)}

          ${globals ? generateGlobalStyles() : ''}
        `
      },
      {
        getCSS: () => `
          html.size-xs {
            font-size: 12px;
          }
          html.size-sm {
            font-size: 14px;
          }
          html.size-md {
            font-size: 16px;
          }
          html.size-lg {
            font-size: 18px;
          }
          html.size-xl {
            font-size: 20px;
          }
          html.size-2xl {
            font-size: 24px;
          }
        `
      }
    ],
    rules: [
      [
        'animate-accordion-down',
        {
          animation: 'shadcn-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
        }
      ],
      [
        'animate-accordion-up',
        {
          animation: 'shadcn-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
        }
      ],
      [
        'animate-collapsible-down',
        {
          animation: 'shadcn-collapsible-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
        }
      ],
      [
        'animate-collapsible-up',
        {
          animation: 'shadcn-collapsible-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
        }
      ]
    ],
    shortcuts: [
      {
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'flex-c': 'flex flex-col',
        'flex-c-center': 'flex-center flex-col',
        'flex-c-stretch': 'flex-c items-stretch',
        'i-flex-center': 'inline-flex justify-center items-center',
        'i-flex-x-center': 'inline-flex justify-center',
        'i-flex-y-center': 'inline-flex items-center',
        'i-flex-c': 'inline-flex flex-col',
        'i-flex-c-center': 'i-flex-center flex-col',
        'i-flex-c-stretch': 'i-flex-c items-stretch',
        'flex-1-hidden': 'flex-1 overflow-hidden',
        'animate-smooth': 'will-change-transform backface-visibility-hidden perspective-1000',
        'animate-gpu': 'transform-gpu',
        'transition-smooth': 'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-fast': 'transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-slow': 'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)'
      }
    ],
    theme: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: 'hsl(var(--destructive-50))',
          100: 'hsl(var(--destructive-100))',
          200: 'hsl(var(--destructive-200))',
          300: 'hsl(var(--destructive-300))',
          400: 'hsl(var(--destructive-400))',
          500: 'hsl(var(--destructive-500))',
          600: 'hsl(var(--destructive-600))',
          700: 'hsl(var(--destructive-700))',
          800: 'hsl(var(--destructive-800))',
          900: 'hsl(var(--destructive-900))',
          950: 'hsl(var(--destructive-950))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          200: 'hsl(var(--success-200))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          700: 'hsl(var(--success-700))',
          800: 'hsl(var(--success-800))',
          900: 'hsl(var(--success-900))',
          950: 'hsl(var(--success-950))'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          50: 'hsl(var(--warning-50))',
          100: 'hsl(var(--warning-100))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
          700: 'hsl(var(--warning-700))',
          800: 'hsl(var(--warning-800))',
          900: 'hsl(var(--warning-900))',
          950: 'hsl(var(--warning-950))'
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          50: 'hsl(var(--info-50))',
          100: 'hsl(var(--info-100))',
          200: 'hsl(var(--info-200))',
          300: 'hsl(var(--info-300))',
          400: 'hsl(var(--info-400))',
          500: 'hsl(var(--info-500))',
          600: 'hsl(var(--info-600))',
          700: 'hsl(var(--info-700))',
          800: 'hsl(var(--info-800))',
          900: 'hsl(var(--info-900))',
          950: 'hsl(var(--info-950))'
        },
        carbon: {
          DEFAULT: 'hsl(var(--carbon))',
          foreground: 'hsl(var(--carbon-foreground))',
          50: 'hsl(var(--carbon-50))',
          100: 'hsl(var(--carbon-100))',
          200: 'hsl(var(--carbon-200))',
          300: 'hsl(var(--carbon-300))',
          400: 'hsl(var(--carbon-400))',
          500: 'hsl(var(--carbon-500))',
          600: 'hsl(var(--carbon-600))',
          700: 'hsl(var(--carbon-700))',
          800: 'hsl(var(--carbon-800))',
          900: 'hsl(var(--carbon-900))',
          950: 'hsl(var(--carbon-950))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'sidebar-background': 'hsl(var(--sidebar-background))',
        'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
        'sidebar-border': 'hsl(var(--sidebar-border))',
        'sidebar-ring': 'hsl(var(--sidebar-ring))',
        'sidebar-primary': 'hsl(var(--sidebar-primary))',
        'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        'sidebar-accent': 'hsl(var(--sidebar-accent))',
        'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontSize: {
        '4xs': ['0.375rem', '0.5rem'],
        '3xs': ['0.5rem', '0.625rem'],
        '2xs': ['0.625rem', '0.75rem']
      }
    }
  };
}

export { generateCSSVars };

export default presetNovaui;

export type { ThemeConfig, ThemeColorKey, ThemeConfigColor, PresetShadcnOptions, ThemeOptions };

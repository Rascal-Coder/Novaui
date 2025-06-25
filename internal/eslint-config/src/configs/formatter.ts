import {
  GLOB_CSS,
  GLOB_HTML,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_TOML,
  GLOB_YAML
} from '../constants/glob';
import { ensurePackages, interopDefault } from '../shared';
import type { FlatConfigItem, Options, PartialPrettierExtendedOptions, PrettierParser } from '../types';

export async function createFormatterConfig(
  options?: Options['formatter'],
  prettierRules: PartialPrettierExtendedOptions = {}
) {
  const { css = true, html = true, json = true, markdown, toml, yaml } = options || {};

  const [pluginPrettier, parserPlain] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier')),
    interopDefault(import('eslint-parser-plain'))
  ]);

  function createPrettierFormatter(files: string[], parser: PrettierParser, plugins?: string[]) {
    const rules: PartialPrettierExtendedOptions = {
      ...prettierRules,
      parser
    };

    if (plugins?.length) {
      rules.plugins = [...(rules.plugins || []), ...plugins];
    }

    const config: FlatConfigItem = {
      files,
      languageOptions: {
        parser: parserPlain
      },
      plugins: {
        prettier: pluginPrettier
      },
      rules: {
        'prettier/prettier': ['warn', rules]
      }
    };

    return config;
  }

  const configs: FlatConfigItem[] = [];

  if (css) {
    const cssConfig = createPrettierFormatter([GLOB_CSS, GLOB_POSTCSS], 'css');
    const scssConfig = createPrettierFormatter([GLOB_SCSS], 'scss');
    const lessConfig = createPrettierFormatter([GLOB_LESS], 'less');

    configs.push(cssConfig, scssConfig, lessConfig);
  }

  if (html) {
    const htmlConfig = createPrettierFormatter([GLOB_HTML], 'html');
    configs.push(htmlConfig);
  }

  if (json) {
    const jsonConfig = createPrettierFormatter([GLOB_JSON, GLOB_JSONC], 'json');

    // const jsonConfig = createPrettierFormatter([GLOB_JSON, GLOB_JSONC], 'json');
    const json5Config = createPrettierFormatter([GLOB_JSON5], 'json5');
    configs.push(jsonConfig, json5Config);
  }

  if (markdown) {
    const markdownConfig = createPrettierFormatter([GLOB_MARKDOWN], 'markdown');
    configs.push(markdownConfig);
  }

  if (yaml) {
    const yamlConfig = createPrettierFormatter([GLOB_YAML], 'yaml');
    configs.push(yamlConfig);
  }

  if (toml) {
    await ensurePackages(['@toml-tools/parser', 'prettier-plugin-toml']);

    const tomlConfig = createPrettierFormatter([GLOB_TOML], 'toml', ['prettier-plugin-toml']);

    configs.push(tomlConfig);
  }

  return configs;
}

/**
 * Formatter configuration for ESLint with Prettier
 *
 * JSON Sort Plugin Usage:
 *
 * ```js
 * // 启用基本JSON排序但不排序exports字段
 * formatter: {
 *   jsonSort: {
 *     recursive: false,
 *     sortOrder: JSON.stringify({
 *       "exports": "none",     // exports字段不排序
 *       "*": "lexical"         // 其他字段按字典序排序
 *     })
 *   }
 * }
 *
 * // 更复杂的package.json排序配置
 * formatter: {
 *   jsonSort: {
 *     recursive: true,
 *     sortOrder: JSON.stringify({
 *       "name": null,          // name字段排在最前面
 *       "version": null,       // version字段第二位
 *       "exports": "none",     // exports字段保持原有顺序
 *       "scripts": "none",     // scripts字段保持原有顺序
 *       "/^dependencies/": "lexical", // dependencies相关字段排序
 *       "*": "lexical"         // 其他字段按字典序排序
 *     })
 *   }
 * }
 * ```
 */

import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}"],
    ignores: ["node_modules/**", "dist/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  ...new FlatCompat().extends("./.eslintrc-auto-import.json"),
  skipFormatting,
  {
    // https://eslint.org/docs/latest/rules/
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
    rules: {},
  },
  {
    // https://eslint.vuejs.org/rules/
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["403", "404", "500", "index"],
        },
      ],
    },
  },
];

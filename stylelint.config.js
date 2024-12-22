/**
 * @type {import('stylelint').Config}
 */
export default {
  ignoreFiles: ["node_modules/**", "dist/**", "stats.html"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-html",
    "stylelint-config-recommended-vue",
  ],
  plugins: [],
  overrides: [],
  // https://stylelint.io/user-guide/rules
  rules: {
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: [],
      },
    ],
  },
};

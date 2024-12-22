/**
 * @type {import('lint-staged').Config}
 */
export default {
  "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}": ["eslint --fix .", "prettier --write ."],
  "*.{vue,html,css,sass,scss,less}": ['stylelint --fix "**/*.{vue,html,css,sass,scss,less}", "prettier --write ."'],
  "*.{json}": ["prettier --write ."],
};

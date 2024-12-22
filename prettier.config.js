/**
 * @see https://prettier.io/docs/en/options
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 120, // 单行最大长度
  tabWidth: 2, // 缩进长度
  useTabs: false, // 是否使用tab缩进
  semi: true, // 句末是否加分号
  singleQuote: false, // 是否使用单引号
  quoteProps: "as-needed", // 当对象的key为字符串时，是否需要加引号
  jsxSingleQuote: false, // 在jsx中是否使用单引号
  trailingComma: "all", // 多行时，最后一行是否加逗号
  bracketSpacing: true, // 对象大括号直接是否有空格
  bracketSameLine: false, // 多行时，大括号是否另起一行
  arrowParens: "always", // 在箭头函数的参数只有一个时，是否需要括号
  htmlWhitespaceSensitivity: "css", // 在html中，空格的敏感度
  vueIndentScriptAndStyle: false, // 在vue文件中，script和style标签中的缩进
  singleAttributePerLine: true, // 在单行中，是否每个属性单独一行
};

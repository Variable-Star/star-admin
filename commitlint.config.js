/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-full-stop": [2, "never", "."],
    "subject-case": [0],
    "type-empty": [2, "never"],
    "type-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "init", // 初始化
        "feat", // 添加新特性
        "fix", // 修复 bug
        "docs", // 修改文档
        "style", // 修改代码格式（不影响代码运行的变动）
        "refactor", // 重构，不包括 bug 修复、功能添加
        "perf", // 优化相关，比如提升性能、体验
        "test", // 测试相关
        "build", // 依赖更新、构建过程或辅助工具的变动
        "ci", // 持续集成配置的变动
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
        "wip", // 开发中
        "workflow", // 工作流改进
        "types", // 类型定义文件更改
        "release", // 发布版本
      ],
    ],
  },
};

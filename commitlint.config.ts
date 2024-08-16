export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case", "start-case", "pascal-case", "upper-case", "lower-case", "camel-case"]],
    "type-enum": [2, "always", ["add", "build", "chore", "update", "docs", "feat", "fix", "refactor", "revert", "style", "test", "sample"]],
    "scope-enum": [1, "always", ["common", "core", "app", "testing"]],
  },
};

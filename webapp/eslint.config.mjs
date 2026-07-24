import js from "@eslint/js";
import pluginSecurity from "eslint-plugin-security";

const nodeGlobals = {
  require: "readonly",
  module: "readonly",
  process: "readonly",
  console: "readonly",
  __dirname: "readonly"
};

const securityRules = {
  "security/detect-eval-with-expression": "error",
  "security/detect-non-literal-fs-filename": "error",
  "security/detect-unsafe-regex": "error"
};

export default [
  js.configs.recommended,
  {
    files: ["server.js", "db.js", "public/validate.js", "tests/*.test.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...nodeGlobals, window: "readonly", describe: "readonly", it: "readonly" }
    },
    plugins: { security: pluginSecurity },
    rules: securityRules
  },
  {
    files: ["tests/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: { process: "readonly", console: "readonly" }
    },
    plugins: { security: pluginSecurity },
    rules: securityRules
  },
  {
    ignores: ["node_modules/**"]
  }
];

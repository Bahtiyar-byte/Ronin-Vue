/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }]
  },
}

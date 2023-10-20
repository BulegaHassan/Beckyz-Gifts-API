module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: 0,
    "linebreak-style": 0,
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ["error", "always"],
    eqeqeq: "error",
    "no-unused-vars": "off",
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
};

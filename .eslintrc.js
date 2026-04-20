const fs = require('fs');
const path = require('path');

const extendsList = [
  'airbnb-base/legacy',
  'prettier',
  'plugin:vue/recommended',
];
// Optional: Windows/Cursor sometimes has an incomplete node_modules; CI has full install.
if (
  fs.existsSync(
    path.join(__dirname, 'node_modules', 'eslint-plugin-storybook', 'package.json')
  )
) {
  extendsList.push('plugin:storybook/recommended');
}
extendsList.push('plugin:cypress/recommended');

module.exports = {
  extends: extendsList,
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['html', 'prettier', 'babel'],
  rules: {
    'prettier/prettier': ['error'],
    camelcase: 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/no-unresolved': 'off',
    'vue/html-indent': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 20,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/no-v-html': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'import/extensions': ['off'],
    'no-console': 'error',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack/resolve.js',
      },
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
    bus: true,
  },
};

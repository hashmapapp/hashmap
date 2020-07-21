module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jam3'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/state-in-constructor': [2, 'never'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-console': ['error', { allow: ['tron', 'log', 'error'] }],
    'no-param-reassign': 'off',
    'react/jsx-props-no-spreading': [
      'off',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [],
      },
    ],
    'jam3/no-sanitizer-with-danger': [
      2,
      {
        wrapperName: ['sanitizer'],
      },
    ],
  },
};

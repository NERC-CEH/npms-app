const ERROR = 2;
const WARN = 1;
const OFF = 0;

module.exports = {
  env: {
    browser: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    // our specific rules
    'react/forbid-prop-types': OFF,
    'jsx-a11y/no-autofocus': OFF,
    'no-plusplus': OFF,
    'react/jsx-filename-extension': OFF,
    'react/require-default-props': OFF,
    'react/sort-comp': OFF,
    'react/destructuring-assignment': OFF,
    'react/button-has-type': OFF,
    'no-unused-expressions': [
      ERROR,
      { allowShortCircuit: true, allowTernary: true },
    ],
    complexity: [WARN, 20],
    eqeqeq: [WARN, 'smart'],
    'guard-for-in': WARN,
    'no-constant-condition': ERROR,
    'no-console': WARN,
    'no-redeclare': [ERROR, { builtinGlobals: true }],
    'object-curly-spacing': [ERROR, 'always'],
    indent: ['error', ERROR, { SwitchCase: WARN }],
    'key-spacing': [ERROR, { afterColon: true, mode: 'minimum' }],
    'no-multiple-empty-lines': [ERROR, { max: ERROR }],
    'no-mixed-spaces-and-tabs': [ERROR, 'smart-tabs'],
    'max-nested-callbacks': [WARN, 10],
    'consistent-this': [WARN, 'self'],
    'no-unexpected-multiline': WARN,
    'no-extra-semi': WARN,
    'no-negated-in-lhs': WARN,
    'linebreak-style': OFF,
    'comma-dangle': OFF,
    'no-case-declarations': OFF,
    'no-underscore-dangle': OFF,
  },
  overrides: [
    {
      files: ['**/__tests__/*.js'],
      rules: {
        'no-unused-expressions': OFF,
      },
    },
  ],
  globals: {
    __ENV__: true,
    __DEV__: true,
    __TEST__: true,
    __PROD__: true,
    t: true,
    browser: true,
    sinon: true,
    expect: true,
    cordova: true,
  },
  settings: {
    'import/resolver': {
      node: {}, // https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-511007063
      webpack: {
        config: 'webpack.config.js',
      },
    },
    react: {
      version: '16.8',
    },
  },
};

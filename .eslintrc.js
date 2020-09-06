module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: ['standard', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  plugins: ['import', 'react', 'jsx-a11y', 'notice'],
  settings: {
    react: {
      version: '16.13.1'
    }
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'max-len': ['warn', 154],
    'no-unused-vars': ['error', { args: 'none' }],
    'semi': ['warn', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/prop-types': 0,
    'react/jsx-tag-spacing': 2,
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop']
  },
  globals: {
    shallow: false,
    render: false,
    mount: false
  }
};

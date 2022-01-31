module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:react/jsx-runtime', // React runtime rules https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md#when-not-to-use-it
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  settings: { react: { version: 'detect' } },
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: 'webpack.*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
}

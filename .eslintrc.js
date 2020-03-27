module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ].map(require.resolve),
  parser: require.resolve('babel-eslint'),
  rules: {
    'import/prefer-default-export': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-fragments': ['error', 'element'],
    'react/require-default-props': 'off',
  },
}

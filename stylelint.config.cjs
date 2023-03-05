module.exports = {
  extends: ['stylelint-config-recommended'],
  overrides: [
    {
      customSyntax: '@stylelint/postcss-css-in-js',
      files: ['src/**/*.{ts,tsx}'],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};

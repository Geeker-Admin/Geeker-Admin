export default {
  '*.{js,mjs,cjs,jsx,ts,tsx}': ['oxlint --fix', 'oxfmt --write'],
  '*.vue': ['oxlint --fix', 'oxfmt --write', 'stylelint --fix'],
  '*.{css,scss}': ['stylelint --fix', 'oxfmt --write'],
  '*.{json,jsonc,md,html,yml,yaml}': ['oxfmt --write'],
}

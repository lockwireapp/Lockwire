module.exports = {
    extends: ['plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        curly: 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
    },
};

module.exports = {
    extends: ['plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    rules: {
        curly: 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/prop-types': ['off'],
    },
};

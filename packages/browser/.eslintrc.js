module.exports = {
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended'],
    parser: '@typescript-eslint/parser',
    rules: {
        curly: 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/prop-types': ['off'],
    },
};

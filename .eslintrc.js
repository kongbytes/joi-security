module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-duplicate-imports': ['error'],
        'no-tabs': ['error'],
        'sort-imports': ['error', {
            ignoreCase: true,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }],
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            overrides: {
                constructors: 'off'
            }
        }],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/no-throw-literal': ['error']
    }
};

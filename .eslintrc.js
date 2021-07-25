module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint'
    ],
    env: {
        node: true
    },
    extends: [
        // Default ESLint rules
        'eslint:recommended',
        // TypeScript-specific rules
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        // Clean import rules
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    rules: {

        'no-duplicate-imports': ['error'],
        'no-tabs': ['error'],
        'no-param-reassign': ['error'],
        'no-proto': ['error'],
        'prefer-const': ['error'],
        'arrow-spacing': ['error'],
        'prefer-template': ['warn'],
        'prefer-destructuring': ['warn'],
        'prefer-spread': ['warn'],
        'no-useless-constructor': ['warn'],
        'no-extra-parens': ['warn'],
        'no-else-return': ['warn'],
        'no-empty-function': ['warn'],

        '@typescript-eslint/explicit-member-accessibility': ['error', {
            overrides: {
                constructors: 'off'
            }
        }],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/no-throw-literal': ['error'],
        '@typescript-eslint/promise-function-async': ['error'],
        '@typescript-eslint/prefer-readonly': ['error'],
        '@typescript-eslint/prefer-for-of': ['error'],
        '@typescript-eslint/prefer-as-const': ['error'],

        // TODO This should be enabled later, failed since TS esModuleInterop option
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-return': ['off'],

        'import/no-unresolved': ['error'],
        'import/named': ['error'],
        'import/no-absolute-path': ['error'],
        'import/no-dynamic-require': ['error'],
        'import/no-self-import': ['error'],
        'import/no-unused-modules': ['error'],
        'import/first': ['error'],
        'import/no-duplicates': ['error'],
        'import/extensions': ['error'],
        'import/order': ['error', {
            groups: [
                ['builtin', 'external'],
                ['internal', 'parent'],
                ['sibling', 'index']
            ],
            'newlines-between': 'always',
            alphabetize: {
                order: 'asc',
                caseInsensitive: true
            }
        }],
        'import/newline-after-import': ['error'],
        'import/no-default-export': ['error'],
        'import/no-named-default': ['error'],
        'import/no-mutable-exports': ['error'],
        'import/no-deprecated': ['warn']

    }
};

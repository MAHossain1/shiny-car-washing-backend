// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      // to enforce using type for object type definitions, can be type or interface
      // '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    ignores: ['**/dist', '**/node_modules/'],
  }
);

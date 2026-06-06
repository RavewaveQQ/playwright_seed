import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'test-results/**', 'playwright-report/**', 'generated/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts'],
    extends: tseslint.configs.recommended,
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
  },

  {
    ...playwright.configs['flat/recommended'],
    settings: {
      playwright: {
        globalAliases: { test: ['setup', 'apiTest', 'uiTest'] },
      },
    },
  },

  {
    files: ['**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-focused-test': 'error',
    },
  },

  {
    files: ['testData/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='expect']",
          message: 'expect() не разрешён в testData — перенеси assertion в Steps или тесты.',
        },
      ],
    },
  },

  prettier,
]);

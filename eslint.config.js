import antfu from '@antfu/eslint-config';
import customClonedRules from './eslint/index.js';

export default antfu(
  {
    stylistic: {
      semi: true,
    },
    plugins: {
      'custom-rules': customClonedRules,
    },
    rules: {
      'antfu/top-level-function': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'no-param-reassign': 'error',
      'complexity': ['error', { max: 5 }],
      'custom-rules/complexity-clone': ['warn', { max: 4 }],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
      'custom-rules/max-lines-per-function-clone': ['warn', { max: 45, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', { max: 3 }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@repo/common/dist/**', '@repo/common/src/**'],
        },
      ],
    },
  },
  {
    plugins: {
      'custom-rules': customClonedRules,
    },
    files: ['scripts/**/*', '**/*.spec.ts', '**/*-spec.ts', '**/*.fixture.ts', '**/vitest-e2e-global-setup.ts'],
    rules: {
      'max-depth': 'off',
      'complexity': 'off',
      'custom-rules/complexity-clone': 'off',
      'max-lines-per-function': 'off',
      'custom-rules/max-lines-per-function-clone': 'off',
    },
  },
  {
    files: [
      'apps/listings-functions/**/*',
      'apps/api/**/*',
      'apps/syndication-jobs/**/*',
      'apps/listings-syndication-jobs-entry-function/**/*',
      'apps/listings-syndication-jobs/**/*',
      'packages/common/**/*',
      'listings-utility/**/*',
    ],
    languageOptions: {
      parserOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
    },
  },
  {
    files: ['apps/api/**/*', 'apps/listings-functions/src/**/*', 'packages/common/src/**/*', 'apps/listings-syndication-jobs/src/**/*'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        overrides: {
          properties: 'off',
          constructors: 'no-public',
          methods: 'explicit',
        },
      }],
    },
  },
);
;
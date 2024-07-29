import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginNode from 'eslint-plugin-node';
import pluginJest from 'eslint-plugin-jest';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...pluginJest.environments.globals.globals,
      },
    },
    plugins: {
      import: pluginImport,
      promise: pluginPromise,
      node: pluginNode,
      jest: pluginJest,
      prettier: pluginPrettier,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'node/no-unsupported-features/es-syntax': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'prettier/prettier': ['error'],
    },
  },
  pluginJs.configs.recommended,
  configPrettier,
];
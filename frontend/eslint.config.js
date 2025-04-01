import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ✔️ Indentação com 2 espaços
      indent: ['error', 2],
      '@typescript-eslint/indent': ['error', 2],

      // ✔️ Ponto e vírgula obrigatório
      semi: ['error', 'always'],
      '@typescript-eslint/semi': ['error', 'always'],

      // ✔️ Linha em branco entre funções e métodos
      'lines-between-class-members': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],

      // ✔️ Remover imports não usados
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
);

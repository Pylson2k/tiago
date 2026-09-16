import astro from 'eslint-plugin-astro';

export default [
  ...astro.configs['flat/recommended'],
  {
    // Astro's own checker is the source of truth for frontmatter TypeScript.
    // Keep ESLint focused on standalone JS/TS until the content migration settles.
    ignores: [
      'dist/**',
      'vendor/**',
      'node_modules/**',
      '**/*.astro',
      'src/main.js',
      'src/lead-tracker.js',
    ],
  },
];

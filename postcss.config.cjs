const { defineConfig } = require('vite');

module.exports = defineConfig({
  css: {
    postcss: './postcss.config.cjs',
  },
});

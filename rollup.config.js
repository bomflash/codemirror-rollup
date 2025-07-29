import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/codemirror-setup.js',
  output: {
    dir: 'dist',
    format: 'es', // Changed from 'iife' to 'es' to support code-splitting
    sourcemap: true
  },
  plugins: [
    nodeResolve(), // Helps Rollup find modules in node_modules
    commonjs({
      // Handle CommonJS modules better
      transformMixedEsModules: true,
      // Suppress the "this is undefined" warnings for specific packages
      ignoreTryCatch: false
    }), // Converts CommonJS modules to ES6
    babel({
      babelHelpers: 'runtime', // Use external babel helpers
      exclude: 'node_modules/**', // Only transpile our source code
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    })
  ],
  // Suppress specific warnings
  onwarn(warning, warn) {
    // Suppress "this is undefined" warnings for codemirror-json-schema
    if (warning.code === 'THIS_IS_UNDEFINED' && warning.id?.includes('codemirror-json-schema')) {
      return;
    }
    // Suppress circular dependency warnings for codemirror-json-schema
    if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message?.includes('codemirror-json-schema')) {
      return;
    }
    // Use default for everything else
    warn(warning);
  }
};

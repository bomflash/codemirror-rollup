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
    commonjs(), // Converts CommonJS modules to ES6
    babel({
      babelHelpers: 'runtime', // Use external babel helpers
      exclude: 'node_modules/**', // Only transpile our source code
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    })
  ]
};

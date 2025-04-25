import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/codemirror-setup.js',
  output: {
    file: 'codemirror-setup.js',
    format: 'iife', // Immediately Invoked Function Expression - suitable for <script> tags
    name: 'codemirrorSetup' // Optional: a global variable name for the bundle
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

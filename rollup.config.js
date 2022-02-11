import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/content.ts',
  output: { file: 'content.js', format: 'iife' },
  plugins: [typescript(), nodeResolve(), terser()]
}
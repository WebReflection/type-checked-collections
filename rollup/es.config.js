import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';


export default {
  input: './esm/index.js',
  plugins: [
    nodeResolve(),
    terser()
  ],
  output: {
    esModule: true,
    exports: 'named',
    file: './es.js',
  }
};

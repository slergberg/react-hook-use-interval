import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import replace from '@rollup/plugin-replace'

import packageDefinition from './package.json'

const { NODE_ENV } = process.env

const config = {
  input: 'src/index.js',
  external: Object.keys(packageDefinition.peerDependencies || {}),
  output: {
    format: 'umd',
    name: 'ReactHookUseInterval',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    visualizer({ filename: 'stats/index.html' }),
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    commonjs(),
  ],
}

if (NODE_ENV === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  )
}

export default config

import ProgressPlugin from 'webpack/lib/ProgressPlugin.js';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',

  target: 'node',

  resolve: {
    extensions: ['.js'],
    modules: ['./node_modules']
  },

  resolveLoader: {
    modules: ['./node_modules']
  },

  entry: './index.js',

  plugins: [new ProgressPlugin()],

  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  watch: false,

  output: {
    filename: 'app.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },

  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5,
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: {
            ascii_only: true,
            comments: false,
            webkit: true
          }
        }
      })
    ]
  }
};

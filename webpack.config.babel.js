import { resolve } from 'path'

const filename = 'lory-a11y' // Output file name
const library = 'loryA11y' // Global (browser) object name

export default (env, argv) => {
  const isDev = argv.mode === 'development'

  return {
    entry: './src/index.js',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: isDev ? `${filename}.js` : `${filename}.min.js`,
      libraryTarget: 'umd',
      library
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
}

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // only run babel on js files
        exclude: /node_modules/, // don't run babel on node_modules
        use: {
          loader: 'babel-loader', // use babel-loader
          options: {
            presets: [ // use these presets (order matters)
              '@babel/preset-react', // transform jsx to js
              '@babel/preset-env', // transform modern js to old js
            ],
            plugins: [ // use these plugins (order matters)
              '@babel/plugin-transform-runtime', // async/await
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/, // only run babel on js files
        exclude: /node_modules/, // don't run babel on node_modules
        use: {
          loader: 'babel-loader', // use babel-loader
          options: {
            presets: [
              // use these presets (order matters)
              '@babel/preset-env', // transform modern js to old js
            ],
            plugins: [
              // use these plugins (order matters)
              '@babel/plugin-transform-runtime', // async/await
            ],
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

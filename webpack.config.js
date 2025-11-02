const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: {
      // JS girişleri (her biri kendi SCSS'ini de import edecek)
      main: './src/js/main.js',
      jobs: './src/js/jobs.js',
      company: './src/js/company.js',
      contact: './src/js/contact.js',
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: false, // CleanWebpackPlugin kullanıyoruz
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 2 },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset',
        },
        {
          test: /\.(woff2?|ttf|eot)$/i,
          type: 'asset/resource',
          generator: { filename: 'assets/fonts/[name][ext]' },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
      // Çoklu sayfa (her sayfa kendi chunk'ını alır)
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/pages/index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'jobs.html',
        template: './src/pages/jobs.html',
        chunks: ['jobs'],
      }),
      new HtmlWebpackPlugin({
        filename: 'company.html',
        template: './src/pages/company.html',
        chunks: ['company'],
      }),
      new HtmlWebpackPlugin({
        filename: 'contact.html',
        template: './src/pages/contact.html',
        chunks: ['contact'],
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 5173,
      open: true,
      hot: false, // CSS ayrı dosya olduğundan HMR’sız sade
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
  };
};

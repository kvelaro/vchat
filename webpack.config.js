const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
mode: 'development',
  entry: {
    login: ['babel-polyfill', path.join(__dirname, 'src', 'js', 'login')],
    main: [path.join(__dirname, 'src', 'js', 'index')]
  },  
  output: {
    filename: 'js/[name]/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
            /*minimize: true*/
          }          
        }, 
        'css-loader'
      ]      
    },
    { 
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?name=css/fonts/[name].[ext]&limit=100000' 
    },    
    { 
      test: /\.(png|jpg|gif)$/,
      loader: "file-loader?name=img/[name].[ext]"
    },
    { 
      test: /\.min\.js$/,
      loader: "file-loader?name=js/[name].[ext]"
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          /*minimize: true*/
        }
      }
    }    
  ]
  },
  plugins: [    
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['main']
      }),
      new htmlWebpackPlugin({
        filename: 'login.html',
        template: './src/login.html',
        chunks: ['login']
      }),
      new MiniCssExtractPlugin({
        filename: "css/bundle.css"
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true        
      }),
      new CopyWebpackPlugin([
        {
          from: './src/data/userlist.json',
          to: 'data',
          toType: 'dir'
        }
      ])
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  }
};
 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
   entry: './app.js',
   output: {
      path: path.resolve(__dirname,''),
      filename: 'bundle.js',
   },
   module: {
      loaders: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders : ['babel-loader']
         },
         {
           test: /\.css$/,
           loaders: ["style-loader","css-loader" ]
         }
      ]
   },
   stats: { 
      colors: true
   },
   devtool: 'source-map',
   watch:true
};
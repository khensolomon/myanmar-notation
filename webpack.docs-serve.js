import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import { merge } from 'webpack-merge';

// import VueLoaderPlugin from 'vue-loader/lib/plugin.js';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.docs.js';

// @ts-ignore
const config = merge(common, {} );

// @ts-ignore
// const app = webpack(config);
// // app.compile(function(e){
// //   console.log(e);
// // })
// app.run(function(e){
//   console.log('...',e||'done');
// });

// webpack.docs
// webpack.docs.serve
// webpack.docs.build
// webpack.docs.compile
// webpack.config.docs

const docs = new webpackDevServer(webpack(config), {
  contentBase: path.resolve('./docs/'),
  publicPath: '/'
});

docs.listen(8080, 'localhost');
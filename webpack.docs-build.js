// import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.docs.js';

// @ts-ignore
const config = merge(common, {
  mode: 'production',
  devtool:'hidden-nosources-source-map', //source-map nosources-source-map
});

// @ts-ignore
const app = webpack(config);
// app.compile(function(e){
//   console.log(e);
// })
app.run(function(e){
  console.log('...',e||'done');
});

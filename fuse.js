#!/usr/bin/env node
const express = require('express');
const path = require('path');
const {
  CSSPlugin,
  CSSResourcePlugin,
  FuseBox,
  SassPlugin,
  WebIndexPlugin,
} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@esnext',
  output: 'dist/$name.js',
  useTypescriptCompiler: true,
  plugins: [
    WebIndexPlugin(),
    // [
    //   SassPlugin(),
    //   CSSResourcePlugin({ dist: 'dist/css-resources' }),
    //   CSSPlugin(),
    // ],
  ],
});

const serverOptions = {
  // fallback: '404.html',
  port: 8078,
};
fuse.dev(serverOptions) //, server => {
  // const dist = path.resolve('./dist');
  // const app = server.httpServer.app;
  // static files
  // app.use('/js/', express.static(path.join(dist, 'js')));
  // dynamic endpoints
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(dist, 'index.html'));
  // });
// });
fuse
  .bundle('app')
  .instructions(' > app.jsx')
  .hmr()
  .watch();
fuse.run();

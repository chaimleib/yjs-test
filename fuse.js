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
    [
      SassPlugin(),
      CSSResourcePlugin({ dist: 'dist/css-resources' }),
      CSSPlugin(),
    ],
  ],
});

const serverOptions = {
  port: 8078,
};
fuse.dev(serverOptions);
fuse
  .bundle('app')
  .instructions(' > app.jsx')
  .hmr()
  .watch();
fuse.run();

#!/usr/bin/env node
const express = require('express');
const path = require('path');
const {
  CSSPlugin,
  CSSResourcePlugin,
  FuseBox,
  JSONPlugin,
  SassPlugin,
  Sparky,
  WebIndexPlugin,
} = require('fuse-box');
const {
  src,
  task,
  watch,
  context,
  fuse,
} = require('fuse-box/sparky');

const sharedConfig = {
  homeDir: 'src',
  output: 'dist/$name.js',
  useTypescriptCompiler: true,
  devServer: {
    port: 8078,
    httpServer: false,
  },
};
context(class {
  getConfig() {
    return FuseBox.init({
      ...sharedConfig,
      target: 'browser@esnext',
      plugins: [
        WebIndexPlugin(),
        JSONPlugin(),
        [
          SassPlugin(),
          CSSResourcePlugin({ dist: 'dist/css-resources' }),
          CSSPlugin(),
        ],
      ],
    });
  }

  createBundle(fuse) {
    const app = fuse.bundle('app');
    if (!this.isProduction) {
      app.hmr().watch();
    }
    app.instructions('>app.jsx');
    return app;
  }
});


task('clean', () => src('dist').clean('dist').exec());

task('launch-server', async context => {
  const server = FuseBox.init({
    ...sharedConfig,
    target: 'server',
    plugins: [
      JSONPlugin(),
    ],
  });
  server
    .bundle('server')
    .instructions('>[server.js]')
    .watch()
    .completed(proc => proc.start())
  await server.run();
});

task('default', ['clean', 'launch-server'], async context => {
  const fuse = context.getConfig();
  fuse.dev(sharedConfig.devServer);
  context.createBundle(fuse);
  await fuse.run();
});

task('dist', ['clean', 'launch-server'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  context.createBundle(fuse);
  await fuse.run();
});

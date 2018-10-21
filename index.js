#! /usr/bin/env node
/**
 * This is a pure-node mock API server implementation
 * See below for options and api mock schema
 * By default server will respond with status 200 and json content-type
 */

const http = require('http');
const fs = require('fs');
const { parseCLIOptions, loadMockApi } = require('./utils');
const watch = require('./watcher');

const config = {
  port: 3000,
  path: './mockApi.json'
};

const args = process.argv.slice(2);
parseCLIOptions(args, config);

let mockApi = loadMockApi(config.path);
console.log(`🧐  Loaded api from ${config.path}`);
watch(config.path, mockApi);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const { method, url } = req;
  const data = mockApi[[method, url].join(' ')];

  console.log(`👉 ${method} ${url}`);

  if (data && data.response) {
    if (data.status) {
      res.statusCode = data.status;
    }
    if (data.headers) {
      Object.entries(data.headers).forEach(([h, v]) => res.setHeader(h, v));
    }
    res.end(JSON.stringify(data.response));
  } else {
    res.status = 404;
    console.log(`🤔 No response for ${method} ${url}`);
    res.end(JSON.stringify({}));
  }
});

server.listen(config.port, '127.0.0.1', () => {
  console.log('🚀 Started server');
  console.log(`🔗 http://localhost:${config.port}`);
});

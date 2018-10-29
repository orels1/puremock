/* eslint-disable no-param-reassign */
const fs = require('fs');
const { loadMockApi } = require('./utils');

const watch = (path, mockApi) => {
  const watcher = fs.watch(path);
  let parsing = false;
  watcher.on('change', () => {
    if (parsing) {
      return;
    }
    parsing = true;
    const newApi = loadMockApi(path);
    if (!newApi) {
      parsing = false;
      return;
    }
    // remove stale stuff
    Object.keys(mockApi)
      .filter(k => !Object.keys(newApi).includes(k))
      .forEach((k) => {
        delete mockApi[k];
      });
    // add new stuff
    Object.entries(newApi).forEach(([k, v]) => {
      mockApi[k] = v;
    });
    parsing = false;
    console.log('👀 Reloaded mock api');
  });
};

module.exports = watch;

const fs = require('fs');

const parseCLIOptions = (options, config) => {
  if (options.length === 0) {
    return;
  }
  const arg = options[0];
  if (options.length === 1) {
    config.path = arg;
    return;
  }
  if (arg.includes('--')) {
    config[arg.substr(2)] = options[1];
    options.splice(0, 2);
  } else {
    options.splice(0, 1);
  }
  parseCLIOptions(options);
};

exports.parseCLIOptions = parseCLIOptions;

const readFile = (path, retries) => {
  const response = fs.readFileSync(path, { encoding: 'utf-8' });
  if ((!response || response.length === 0) && retries !== 0) {
    return readFile(path, retries - 1);
  }
  return response;
};

const loadMockApi = path => {
  try {
    fs.statSync(path);
    const apiData = readFile(path, 10);
    const api = JSON.parse(apiData);
    return api;
  } catch (e) {
    if (e.name === 'SyntaxError') {
      console.log(`⚠️  Could not parse ${path}`);
      return;
    }
    if (e.message.includes('ENOENT')) {
      console.log(`⚠️  No api config found @ ${path}`);
      return;
    }
    console.error(e);
    process.exit(1);
  }
};

exports.loadMockApi = loadMockApi;

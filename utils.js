const fs = require('fs');

/* eslint-disable no-param-reassign */
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
    config[arg.substr(2)] = options[1]; /* eslint-disable-line prefer-destructuring */
    options.splice(0, 2);
  } else {
    options.splice(0, 1);
  }
  parseCLIOptions(options);
};
/* eslint-enable no-param-reassign */

exports.parseCLIOptions = parseCLIOptions;

const readFile = (path, retries) => {
  const response = fs.readFileSync(path, { encoding: 'utf-8' });
  if ((!response || response.length === 0) && retries !== 0) {
    return readFile(path, retries - 1);
  }
  return response;
};

const loadMockApi = (path) => {
  try {
    fs.statSync(path);
    const apiData = readFile(path, 10);
    const api = JSON.parse(apiData);
    return api;
  } catch (e) {
    if (e.name === 'SyntaxError') {
      console.log(`⚠️  Could not parse ${path}`);
      return null;
    }
    if (e.message.includes('ENOENT')) {
      console.log(`⚠️  No api config found @ ${path}`);
      return null;
    }
    console.error(e);
    process.exit(1);
    return null;
  }
};

exports.loadMockApi = loadMockApi;

/* eslint-disable no-param-reassign */
const parseKeys = (roots, parts, key = '') => {
  if (roots.length === 0) {
    // if lengths match
    if (parts.length === 0) {
      return key;
    }
    return '';
  }

  // if we have an exact match
  if (roots[0] === parts[0]) {
    key += `/${roots[0]}`;
    return parseKeys(roots.slice(1), parts.slice(1), key);
  }
  // if we have a `:name` wildcard
  if (roots[0].includes(':')) {
    key += `/${roots[0]}`;
    return parseKeys(roots.slice(1), parts.slice(1), key);
  }
  // if we have no match
  return '';
};
/* eslint-enable no-param-reassign */

/* eslint-disable no-restricted-syntax */
const findMockKey = (roots, parts) => {
  let key = '';
  for (const rootPath of roots) {
    const tempKey = parseKeys(
      rootPath
        .split(' ')[1]
        .split('/')
        .slice(1),
      parts,
    );
    if (tempKey.length && !tempKey.includes(':') && key && key.includes(':')) {
      key = tempKey;
      break;
    }
    if (key.length) {
      break;
    }
    key = tempKey;
  }
  return key;
};
/* eslint-enable no-restricted-syntax */

exports.findMockKey = findMockKey;

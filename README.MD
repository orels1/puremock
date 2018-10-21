<h1 align="center">Puremock</h1>
<p align="center">
  <strong>⚡️ A zero-dependency mock api server ⚡️</strong><br />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/puremock">
    <img src="https://img.shields.io/npm/v/puremock.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/puremock">
    <img src="https://img.shields.io/npm/dm/puremock.svg?style=flat-square" />
  </a>
  <img src="https://img.shields.io/badge/zero-dependencies-blue.svg?style=flat-square" />
</p>

<p align="center">
  <sub>Built with ❤︎ by
  <a href="https://twitter.com/orels1_">orels1</a>
  </sub>
</p>

## Installation

```shell
# with npm
npm i -g puremock

#with yarn
yarn global add puremock
```

## Usage

By default the server will start at `localhost:3000`.

### Create a mock file

```json
{
  "GET /": {
    "response": {
      "status": "ok"
    }
  },
  "GET /": {
    "status": 503,
    "header": {
      "x-powered-by": "mock-api-server"
    },
    "response": {
      "error": "Internal Server Error"
    }
  }
}
```

That's about it as far as configuration goes. You can supply any kind of HTTP method, set response codes and headers.

Default response code is 200, and the `Content-Type` header is set to `application/json`.

### Start the server

```shell
# uses a mockApi.json in the project root
puremock

# you can pass a custom path to a mock file
puremock ./mocks/api.json

# port customization is also supported
puremock --port 4000
```

### Contribute

There are still things we can add while staying lightweight and zero-dependency:

- [x] Add a mock file hot-reload
- [ ] Support for dynamic urls (i.e. `/posts/:id)
- [ ] Add a set of prebuilt error responses so users can just supply `status: 503) to get a meaningful response object without defining it
- [ ] Improve the watcher logic (it fails from time to time so I have a bunch of retries there)

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

## Motivation

Hacktoberfest, mainly, but also just a search for a package like this that took me more than an hour and ultimately pointed me to Mockoon (which is great, btw, [check it out](https://mockoon.com/)). But I figured I should make this too, since I have a soft spot for cute zero-dep tools, so here we are. Hope you'll enjoy using it as much, as I did developing it.

## Installation

```shell
# with npm
npm i -g puremock

#with yarn
yarn global add puremock
```

## Usage

### Create a mock file

By default puremock will look for `mockApi.json` in the project root. But you can also supply a different path (see below).

```json
{
  "GET /": {
    "response": {
      "status": "ok"
    }
  },
  "GET /error": {
    "status": 503,
    "header": {
      "x-powered-by": "mock-api-server"
    },
    "response": {
      "error": "Internal Server Error"
    }
  },
  "GET /articles/:name" {
    "response": {
      "title": "Foobar"
    }
  }
}
```

That's about it as far as configuration goes. You can supply any kind of HTTP method, set response codes and headers.

Path params are supported (with multiple levels), so you can have endpoints like `/root/:param1/:param2` or `/root/exact/:param1` and so on. Useful when you have a bunch of dynamic IDs your app requests, but you don't care if the same thing is being returned.

Check `example.json` for references.

Default response code is 200, and the `Content-Type` header is set to `application/json`.

### Start the server

By default the server will start at `localhost:3000`.

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
- [x] Support for dynamic urls (i.e. `/posts/:id)
- [ ] Add a set of prebuilt error responses so users can just supply `status: 503) to get a meaningful response object without defining it
- [ ] Improve the watcher logic (it fails from time to time so I have a bunch of retries there)

The package is auto-published with the latest tag in the package.json when merged into `master`.

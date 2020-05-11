## Registering provider

Like any other provider, you need to register the provider inside `start/app.js` file.

```js
const providers = [
  'adonisjs-kwikng/providers/KwikNgProvider'
]
```

## Registering middleware

Register the following middleware inside `start/kernel.js` file. Place the kwikng middleware as a named middleware like so

```js
const namedMiddleware = {
  kwik_token_refresh: 'Adonis/Middleware/RefreshKwikToken',
}
```

## Config

The configuration is saved inside `config/kwikng.js` file. Tweak it accordingly.

## Docs

To find out more, read the docs [here](https://github.com/stitchng/adonis-kwikng).

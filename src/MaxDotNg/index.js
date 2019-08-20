'use strict'

class MaxDotNgApiClient {
  constructor (Agent, Config, Env) {
    let isProd = (Env.get('NODE_ENV') === 'production')
    this.agent = new Agent(Config.get('maxdotng.apiKey'), isProd)
  }
}

module.exports = MaxDotNgApiClient

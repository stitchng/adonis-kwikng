'use strict'

class KwikNgApiClient {
  constructor (Agent, Config, Env) {
    let isProd = (Env.get('NODE_ENV') === 'production')
    this.API = new Agent(Config.get('kwikng.domain'), isProd)
  }
  
  set accessToken (token) {
    this.API.setAccessToken (token);
  }
  
  set vendorId (id) {
    this.API.setVendorId(id);
  }
  
  set userId (id) {
    this.API.setUserId(id);
  }
}

module.exports = MaxDotNgApiClient

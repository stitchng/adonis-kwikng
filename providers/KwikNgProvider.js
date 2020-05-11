'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class KwikNgProvider extends ServiceProvider {

  /**
   * Register method called by ioc container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Adonis/Addons/Kwik', (app) => {
      const Config = this.app.use('Adonis/Src/Config')
      const Env = this.app.use('Env')
      const KwikNgApiClient = require('../src/KwikNg/index.js')

      let client  = new KwikNgApiClient(require('kwik-nodejs'), Config, Env);
      
      return client;
    });

    this.app.alias('Adonis/Addons/Kwik', 'Kwik');
    
    this.app.bind('Adonis/Middleware/RefreshKwikToken', (app) => {
      const Config = this.app.use('Adonis/Src/Config');
      
      let RefreshKwikToken = require('../Middleware/RefreshKwikToken')
      return new RefreshKwikToken(app.use('Adonis/Addons/Kwik'), Config);
    })
  }

  /**
   * Boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    ;
  }
}

module.exports = KwikNgProvider

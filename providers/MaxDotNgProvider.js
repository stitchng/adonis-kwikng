'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class MaxDotNgProvider extends ServiceProvider {

  /**
   * Register method called by ioc container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('Adonis/Addons/Max', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Env = this.app.use('Env')
      const MaxDotNgAPIClient = require('../src/MaxDotNg/index.js')

      let client  = new MaxDotNgAPIClient(require('maxng-nodejs'), Config, Env);
      
      return client.agent;
    })

    this.app.alias('Adonis/Addons/Max', 'Max')
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

module.exports = MaxDotNgProvider

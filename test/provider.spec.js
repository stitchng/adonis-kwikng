'use strict'

/*
 * adonis-maxdotng
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const { ioc } = require('@adonisjs/fold')
const { Config, Env } = require('@adonisjs/sink')
const MaxDotNgProvider = require('../providers/MaxDotNgProvider.js')

let MaxDotNgInstance = null

test.group('AdonisJS InfoBipProvider Test(s)', (group) => {
  group.beforeEach(() => {
    ioc.bind('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('maxdotng.apiKey', 'YWdJm94f8a309e09349ebc8e4eC')

      return config
    })

    ioc.bind('Env', () => {
      let env = new Env()

      env.set('NODE_ENV', 'development')

      return env
    })
  })

  test('instantiate without errors or side-effects [maxdotng]', (assert) => {
    const provider = new MaxDotNgProvider(ioc)
    provider.register()

    InfoBipInstance = ioc.use('Adonis/Addons/Max')

    assert.isTrue(typeof InfoBipInstance.getAllDeliveryRequests === 'function')
    assert.isTrue(typeof InfoBipInstance.getPickUpWindow === 'function')
    assert.isTrue(typeof InfoBipInstance.getDeliveryRequestStatus === 'function')
    assert.isTrue(typeof InfoBipInstance.scheduleDeliveryRequest === 'function')
  })
})

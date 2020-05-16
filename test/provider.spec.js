'use strict'

/*
 * adonis-kwikng
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const { ioc } = require('@adonisjs/fold')
const { Config, Env } = require('@adonisjs/sink')
const KwikNgProvider = require('../providers/KwikNgProvider.js')

let KwikNgInstance = null

test.group('AdonisJS KwikNgProvider Test(s)', (group) => {
  group.beforeEach(() => {
    ioc.bind('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('kwikng.domain', 'test-client-1.kwik.delivery')
      config.set('kwikng.email', 'basic.account@gmail.com')
      config.set('kwikng.password', 'YWdJm94f8a30')
      config.set('kwikng.timeout', '180000')

      return config
    })

    ioc.bind('Env', () => {
      let env = new Env()

      env.set('NODE_ENV', 'development')

      return env
    })
  })

  test('instantiate without errors or side-effects [kwikng]', (assert) => {
    const provider = new KwikNgProvider(ioc)
    provider.register()

    KwikNgInstance = ioc.use('Adonis/Addons/Kwik').API

    assert.isTrue(typeof KwikNgInstance.createCorporate === 'function')
    assert.isTrue(typeof KwikNgInstance.listAllCorporatesInvoices === 'function')
    assert.isTrue(typeof KwikNgInstance.cancelDeliveryTask === 'function')
    assert.isTrue(typeof KwikNgInstance.scheduleDeliveryTask === 'function')
  })
})

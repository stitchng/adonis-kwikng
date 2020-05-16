'use strict'

class RefreshKwikToken {
  constructor (kwikClient, Config) {
    this.transportClient = kwikClient
    this.delayUntilRefresh = Config.get('kwikng.timeout')
    // this.tokenCacheDriver = Config.get('kwikng.refreshTokenCacheDriver')
    this.credentials = {
      email: Config.get('kwikng.email'),
      password: Config.get('kwikng.password')
    }
  }

  async handle ({ request, session }, next) {
    let error = null
    let response = { body: {} }
    let tokenCacheStruct = JSON.parse(session.get('kwik_api_data') || 'null')

    let now = Date.now()
    let diff = 0

    // e.g. 2 minutes = 120000 milliseconds
    const DELAY_MINUTES = Number(this.delayUntilRefresh) // default: 8 minutes

    if (tokenCacheStruct === null) {
      tokenCacheStruct = { reqTimestamp: 0, data: null }
    }

    let { data, reqTimestamp } = tokenCacheStruct

    try {
      if (now - reqTimestamp >= DELAY_MINUTES) {
        response = await this.transportClient.API.adminLogin(this.credentials)
      }
    } catch (err) {
      error = err
    } finally {
      if (error === null) {
        if (response.body.message === 'Logged in successfully.' &&
            response.body.status === 200) {
          let tokenReady = Date.now()

          diff = tokenReady - now
          reqTimestamp = now + diff

          data = response.body.data
        }
      } else {
        data = { vendor_details: { vendor_id: '', user_id: '' }, access_token: '' }
        reqTimestamp = now
      }
    }

    this.transportClient.accessToken = data.access_token
    this.transportClient.vendorId = data.vendor_details.vendor_id
    this.transportClient.userId = data.vendor_details.user_id
    this.transportClient.cardId = data.vendor_details.card_id

    session.put('kwik_api_data', JSON.stringify({ data, reqTimestamp }))

    await next()
  }
}

module.exports = RefreshKwikToken

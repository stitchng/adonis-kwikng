'use strict'

class RefreshKwikToken {
  constructor (kwikClient, Config) {
    this.transportClient = kwikClient
    this.delayUntilRefresh = Config.get('kwikng.timeout')
    this.tokenCacheKeyName = Config.get('kwikng.tokenCacheKeyName')
    // this.tokenCacheDriver = Config.get('kwikng.refreshTokenCacheDriver')
    this.credentials = {
      email: Config.get('kwikng.email'),
      password: Config.get('kwikng.password')
    }
  }

  async handle ({ request, response, session }, next) {
    let error = null
    let _response = { body: {} }
    let tokenCacheStruct = JSON.parse(session.get(this.tokenCacheKeyName) || 'null')

    let now = Date.now()
    let diff = 0

    const bestFormat = request.accepts(['json', 'html'])

    // e.g. 2 minutes = 120000 milliseconds
    const DELAY_MINUTES = Number(this.delayUntilRefresh) // default: 8 minutes

    if (tokenCacheStruct === null) {
      tokenCacheStruct = { reqTimestamp: 0, data: null }
    }

    let { data, reqTimestamp } = tokenCacheStruct

    try {
      if (now - reqTimestamp >= DELAY_MINUTES) {
        _response = await this.transportClient.API.adminLogin(this.credentials)
      }
    } catch (err) {
      error = err
    }

    if (error === null) {
      if (_response.body.message === 'Logged in successfully.' &&
          _response.body.status === 200) {
        let tokenReady = Date.now()

        diff = tokenReady - now
        reqTimestamp = now + diff

        data = _response.body.data
      }
    } else {
      if (_response.body.status === 201 &&
        _response.body.message === 'Either your supplied Email ID or Password is incorrect') {
        // the login failed due to incorrect credentials
        if (bestFormat === 'json') {
          return response.status(500).json({
            status: 500,
            message: _response.body.message
          })
        }
        return response.status(500).send(
          _response.body.message
        )
      }

      data = { vendor_details: { vendor_id: '', user_id: '' }, access_token: '' }
      reqTimestamp = now
    }

    this.transportClient.accessToken = data.access_token
    this.transportClient.vendorId = data.vendor_details.vendor_id
    this.transportClient.userId = data.vendor_details.user_id
    this.transportClient.cardId = data.vendor_details.card_id

    session.put(this.tokenCacheKeyName, JSON.stringify({ data, reqTimestamp }))

    await next()
  }
}

module.exports = RefreshKwikToken

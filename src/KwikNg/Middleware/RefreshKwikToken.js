'use strict'

class RefreshKwikToken {
  constructor (kwikClient, Config) {
    this.transportClient = kwikClient
    this.credentials = {
      email: Config.get('kwikng.email'),
      password: Config.get('kwikng.password')
    }

  async handle ({ request, session }, next) {
    let error = null
    let response = {body:{}}
    
    try {
      response = await this.transportClient.API.adminLogin(this.credentials)
    } catch (err) {
      error = err;
    }finally{
      if(error !== null){
        if(response.body.message === 'Logged in successfully.' 
            && response.body.status === 200){
            session.set('kwik_api_data', response.body.data);
            
            this.transportClient.accessToken = response.body.data.access_token;
            this.transportClient.vendorId = response.body.data.vendor_details.vendor_id
            this.transportClient.userId = response.body.data.vendor_details.user_id
        }
      }
    }

    await next()
  }
}

module.exports = RefreshKwikToken

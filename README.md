# adonis-kwikng

An addon/plugin package to provide KwikNG automated last-mile delivery services in AdonisJS 4.0+

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]

<img src="http://res.cloudinary.com/adonisjs/image/upload/q_100/v1497112678/adonis-purple_pzkmzt.svg" width="200px" align="right" hspace="30px" vspace="140px">

## Getting Started

>Install from the NPM Registry

```bash

   $ adonis install adonisjs-kwikng

```

## Usage

>Import and use 

```js

  'use strict'
  
  const Kwik = use('Kwik')
  const User = use('App/Models/User')
  
  class LogisticsController {
  
      constructor(Event){
          this.event = Event
      }
      
      static get inject(){
          return [
              'Event'
          ]
      }
      
      async requestDelivery({ request, params, response }){
      
          let user = await User.find(params.user_id) // get user from database

          let response = await Kwik.API.scheduleDeliveryTask({
                  pickup_delivery_relationship: 0,
                  payment_method: 131072 /* PAGA wallet payment */, 
                  is_multiple_tasks: 1, 
                  has_pickup: 1, 
                  has_delivery: 1, 
                  timezone: '+60' /* West African Time: +1:00hr from UTC */, 
                  auto_assignment: 0, 
                  layout_type: 0, 
                  team_id: 1 /* get your 'team_id' from your admin dashboard */,
                  amount: "1240.45", // Naira
                  total_no_of_tasks: 1 /* get this value from Kwik.API.getExactPricingForDeliveryTask() */,
                  total_service_charge: 0 /* get this value from Kwik.API.getExactPricingForDeliveryTask() */,
                  deliveries: [
                    {
                      "address": "No 4 Awgu Close, Garki, Area 3, Abuja",
                      "name": user.business_name,
                      "latitude": 9.0541091,
                      "longitude": 7.4349443,
                      "time": "2020-12-20 12:48:24",
                      "phone": user.phone, // user phone number
                      "email": user.email, // user email
                      "has_return_task": false,
                      "is_package_insured": 0,
                      "template_data": [ ]
                    }
                  ],
                  pickups: [
                    {
                      "address": "Dyzn Clothing LLC",
                      "name": "Dzyn Babe",
                      "latitude": 9.0392449,
                      "longitude": 7.4220623,
                      "time": "2020-12-20 11:27:11",
                      "phone": "+2349045739731",
                      "email": "dzyn.fash.ng@gmail.com"
                    }
                  ]
          
          });
          
          this.event.fire('mixpanel::event', { key: 'delivery_dispatched' });
          
          return response.status(201).json({
             data:response.body.data
          })
      }
  }
  
  module.exports = LogisticsController

```

## License

MIT

## Running Tests
```bash

    npm i

```

```bash

    npm run lint

    npm run test

```

## Credits

- [Ifeora Okechukwu](https://twitter.com/isocroft)
    
## Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/adonis-kwikng/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/adonisjs-kwikng.svg?style=flat-square
[npm-url]: https://npmjs.org/package/adonisjs-kwikng

[travis-image]: https://img.shields.io/travis/stitchng/adonis-kwikng/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/stitchng/adonis-kwikng

[coveralls-image]: https://img.shields.io/coveralls/stitchng/adonis-kwikng/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/github/stitchng/adonis-kwikng

# adonis-maxdotng

An addon/plugin package to provide MaxDotNG automated last-mile delivery services in AdonisJS 4.1+

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]

<img src="http://res.cloudinary.com/adonisjs/image/upload/q_100/v1497112678/adonis-purple_pzkmzt.svg" width="200px" align="right" hspace="30px" vspace="140px">

## Getting Started

>Install from the NPM Registry

```bash

   $ adonis install adonisjs-maxdotng

```

## Usage

>Import and use 

```js

  'use strict'
  
  const Max = use('Max')
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
      
      async requestDelivery({ request, response }){
      
          let user = await User.find(1) // get user from database

          let response = await Max.scheduleDeliveryRequest({
            sender_name: "Omotayo Adebisi",
            sender_phone: "+2348134499017",
            recipient_name: "Adrian Kwaleh",
            recipient_phone: "+2347045738911",
            is_card: false
          })
          
          this.event.fire('mixpanel::event', {key: 'deliveryDispatched'});
          
          return response.status(201).json({
             data:response.body
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

- [Ifeora Okechukwu <Head Of Technology - Oparand>](https://twitter.com/isocroft)
    
## Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/adonis-maxdotng/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/adonisjs-maxdotng.svg?style=flat-square
[npm-url]: https://npmjs.org/package/adonisjs-maxdotng

[travis-image]: https://img.shields.io/travis/stitchng/adonis-maxdotng/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/stitchng/adonis-maxdotng

[coveralls-image]: https://img.shields.io/coveralls/stitchng/adonis-maxdotng/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/github/stitchng/adonis-maxdotng

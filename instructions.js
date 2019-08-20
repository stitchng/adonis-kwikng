'use strict'

/**
 * adonis-maxdotng
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 * @extended Oparand - Ifeora Okechukwu <isocroft@gmail.com>
 */

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.makeConfig('maxdotng.js', path.join(__dirname, 'config/maxdotng.js'))
    cli.command.completed('create', 'config/maxdotng.js')
  } catch (error) {
    // ignore if maxdotng.js already exists
  }
}

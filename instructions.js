'use strict'

/**
 * adonis-kwikng
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 * @extended Oparand - Ifeora Okechukwu <isocroft@gmail.com>
 */

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.makeConfig('kwikng.js', path.join(__dirname, 'config/kwikng.js'))
    cli.command.completed('create', 'config/kwikng.js')
  } catch (error) {
    // ignore if kwikng.js already exists
  }
}

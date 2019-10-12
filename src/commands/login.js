const {Command} = require('@oclif/command')
const {cli} = require('cli-ux')
const got = require('got')
const {CookieJar} = require('tough-cookie')
const Conf = require('conf')

const config = new Conf()
const cookieJar = new CookieJar()

class LoginCommand extends Command {
  async run() {
    const username = await cli.prompt('Username')
    const password = await cli.prompt('Password', {type: 'hide'})
    
    const res = await got('https://informatics.msk.ru/login/index.php', {
      cookieJar, 
      method: 'POST',
      form: true,
      followRedirect: false,
      body: {
        username, password
      }
    })

    if (res.statusCode === 200) {
      this.error('Invalid username or password')
    } else {
      config.set('username', username)
      config.set('password', password)
      this.log('Logged in as ' + username)
    }
  }
}

LoginCommand.description = `Log in with your Informatics account`

LoginCommand.flags = {}

module.exports = LoginCommand

const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const got = require('got')
const {CookieJar} = require('tough-cookie')
const Conf = require('conf')
const path = require('path')
const ProgressBar = require('progress')
const langToFile = require('../langToFile')

const fs = require('fs')

const config = new Conf({
  projectName: 'informatics',
  projectVersion: '0.0.1'
})
const cookieJar = new CookieJar()

async function getAllParcels(onlyOK) {
  const {body} = await got(`https://informatics.msk.ru/py/problem/0/filter-runs?problem_id=0&from_timestamp=-1&to_timestamp=-1&group_id=0&user_id=384615&lang_id=-1&status_id=${onlyOK ? '0' : '-1'}&statement_id=&count=100&with_comment=&page=1`, {cookieJar, json: true})

  let parcels = []

  for (let i = 1; i <= body.metadata.page_count; i++) {
    const {body} = await got(`https://informatics.msk.ru/py/problem/0/filter-runs?problem_id=0&from_timestamp=-1&to_timestamp=-1&group_id=0&user_id=384615&lang_id=-1&status_id=${onlyOK ? '0' : '-1'}&statement_id=&count=100&with_comment=&page=${i}`, {cookieJar, json: true})
    parcels = parcels.concat(body.data)
  }

  return parcels
}

class ExportCommand extends Command {
  async run() {
    const {flags, args} = this.parse(ExportCommand)
    const res = await got('https://informatics.msk.ru/login/index.php', {
      cookieJar, 
      method: 'POST',
      form: true,
      followRedirect: false,
      body: {
        username: config.get('username'),
        password: config.get('password')
      }
    })

    if (res.statusCode === 200) {
      this.error('Credentials are invalid. Please run `informatics login` to log in')
    } else {
      this.log('Logged in as ' + config.get('username'))
    }

    const parcels = await getAllParcels(flags.onlyOK)
    //console.log(parcels)

    const bar = new ProgressBar('Downloading [:bar] :percent :eta', { total: parcels.length })

    const promises = parcels.map(async parcel => {
      const {body} = await got(`https://informatics.msk.ru/py/problem/run/${parcel.id}/source`, {json: true, cookieJar})

      //console.log(path.join(process.cwd(), args.path, parcel.problem.id.toString()))
      //console.log(process.cwd(), args.path, parcel.problem.id)
      try {
        fs.mkdirSync(path.join(process.cwd(), args.path, parcel.problem.id.toString()), {recursive: true})
        fs.writeFileSync(path.join(process.cwd(), args.path, parcel.problem.id.toString(), parcel.id + '.' + langToFile(parcel.ejudge_language_id)), body.data.source)
      } catch(error) {
        console.log('Failed to write. ', error)
      }
      
      bar.tick()
    })
  }
}

ExportCommand.args = [
  {name: 'path'}
]

ExportCommand.description = `Export all your parcels from Informatics`

ExportCommand.flags = {
  onlyOK: flags.boolean({char: 'k', description: 'Only export parcels marked as "OK"'}),
  debug: flags.boolean({char: 'd', description: 'Debug mode'})
}

module.exports = ExportCommand

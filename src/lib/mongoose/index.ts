import mongoose, { Connection } from 'mongoose'
import fs from 'fs'
import environment from '@env/index'
import log from '@lib/logger'

const URI = environment.mongoose.uri
const OPTS = environment.mongoose.options

mongoose.Promise = global.Promise

export async function mongoConnect(): Promise<void> {
  try {
    await mongoose.connect(URI, OPTS)
    const db: Connection = mongoose.connection

    db.on('disconnect', () => {
      log.failed(`MongoDB -> connection error: ${URI}`)
      mongoConnect()
    })

    db.on('reconnect', () => {
      log.warn(`MongoDB -> reconnected: ${URI}`)
    })

    log.success(`MongoDB -> connected: ${URI}`)

    const models: string[] = fs.readdirSync(`${environment.base}/api/models`)
    const ext: string = environment.mode === 'development' ? '.ts' : '.js'
    for (const i in models) {
      if (models[i].indexOf(ext) > -1) await import(`${environment.base}/api/models${models[i]}`)
    }
    // Plnat Seed
    // TODO
  } catch (err) {
    log.fatal(`MongoDB -> connection error: ${URI}`, err)
    process.exit(-1)
  }
}

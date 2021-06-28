import mongoose, { Connection } from 'mongoose'
import fs from 'fs'
import config from 'environment'
import logger from 'lib/logger'

const URI = config.mongoose.uri
const OPTS = config.mongoose.options

mongoose.Promise = global.Promise

export async function mongoConnect(): Promise<void> {
  try {
    await mongoose.connect(URI, OPTS)
    const db: Connection = mongoose.connection

    db.on('disconnect', () => {
      logger.failed(`MongoDB -> connection error: ${URI}`)
      mongoConnect()
    })

    db.on('reconnect', () => {
      logger.warn(`MongoDB -> reconnected: ${URI}`)
    })

    logger.success(`MongoDB -> connected: ${URI}`)

    const models: string[] = fs.readdirSync(`${config.base}/api/models`)
    const ext: string = config.mode === 'development' ? '.ts' : '.js'
    for (const i in models) {
      if (models[i].indexOf(ext) > -1) require(`${config.base}/api/models${models[i]}`)
    }
    // Plnat Seed
    // TODO
  } catch (err) {
    logger.fatal(`MongoDB -> connection error: ${URI}`, err)
    process.exit(-1)
  }
}

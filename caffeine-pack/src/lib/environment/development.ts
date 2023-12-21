import path from 'path'
import { config } from 'dotenv'

config()

const APP_NAME = 'caffeine-pack'
const DB_NAME = 'caffeine-dev'
const PORT = +process.env.PORT || 3000
export default {
  secret: 'the_most_secret_key', // secret key
  server: {
    ip: process.env.IP || 'localhost',
    port: PORT
  },
  log: true, // show logs
  // Roles: if a user has multiple roles, will take the time of the greater role
  roles: [
    {
      role: 'user',
      ttl: '10 days'
    },
    {
      role: 'admin',
      ttl: '10 days'
    }
  ],
  path: {
    disabled: '/:url(api|assets|auth|config|lib|views)/*' // paths 404
  },
  socketIO: {
    port: PORT + 1
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  redisJWT: {
    // Session
    maxretries: 10,
    // auth: '123456', // optional password
    db: 0, // optional db selection
    secret: 'secret_key', // secret key for token
    multiple: true, // single or multiple sessions by user
    kea: false // Enable notify-keyspace-events KEA
  },
  nodemailer: {
    host: process.env.NODEMAILER_HOST || 'host@goeas.here',
    port: process.env.NODEMAILER_PORT || 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER || 'user@goes.here',
      pass: process.env.NODEMAILER_PASSWORD || 'password'
    },
    tls: { rejectUnauthorized: false }
  },

  mongoose: {
    // MongoDB
    // uri: `mongodb://username:password@host:port/database?options`
    uri: `mongodb://localhost:27017/${DB_NAME}`,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    },
    seed: {
      path: '/api/models/seeds/',
      list: [
        {
          file: 'user.seed',
          schema: 'User',
          plant: 'never' //  once - always - never
        },
        {
          file: 'example.seed',
          schema: 'Example',
          plant: 'never'
        }
      ]
    }
  },
  oAuth: {
    // oAuth
    local: {
      enabled: true
    },
    localAdmin: {
      enabled: true
    }
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || 5672,
    user: process.env.RABBITMQ_USER || 'guest',
    pass: process.env.RABBITMQ_PASS || 'guest',
    portCluster: process.env.RABBITMQ_PORT_CLUSTER || 25672
  },
  // globals
  mode: process.env.NODE_ENV || 'development', // mode
  name: APP_NAME, // name
  node: parseInt(process.env.NODE_APP_INSTANCE) || 0, // node instance
  root: path.normalize(`${__dirname}/../..`), // root
  base: path.normalize(`${__dirname}/../..`) // base
}

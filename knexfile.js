const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'
const { PG_URI } = loadEnvConfig('./', dev).combinedEnv

module.exports = {
  client: 'pg',
  connection: PG_URI,
  migrations: {
    directory: './lib/knex/migrations',
  },
  seeds: {
    directory: './lib/knex/seeds',
  },
}

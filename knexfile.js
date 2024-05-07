const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'
const { PG_PASSWORD } = loadEnvConfig('./', dev).combinedEnv

module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'pguser',
    password: PG_PASSWORD,
    database: 'postgresdb',
  },
  migrations: {
    directory: './lib/knex/migrations',
  },
  seeds: {
    directory: './lib/knex/seeds',
  },
}

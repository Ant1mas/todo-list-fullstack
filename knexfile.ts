import { loadEnvConfig } from '@next/env'

loadEnvConfig('./')

const config = {
  client: 'postgresql',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  migrations: {
    directory: './lib/config/knex/migrations',
  },
  seeds: {
    directory: './lib/config/knex/seeds',
  },
}

export default config

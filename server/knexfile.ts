// Update with your config sDB_NAME
import dotenv from 'dotenv'

dotenv.config({ path: `configs/.env.${process.env.NODE_ENV || 'development'}` })

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: '_migrations'
  }
}

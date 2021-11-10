import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import '../utils/pagination'

const mysqlPlugin: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {

  const cfg: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING === 'true',
    entities: [__dirname + '/../models/*.ts'],
    subscribers: [__dirname + '/../subscribers/*.ts'],
    synchronize: false
  }

  const dbCon = await createConnection(cfg)

  fastify.decorate('dbCon', dbCon)

}

export default fp(mysqlPlugin)

declare module 'fastify' {
  export interface FastifyInstance {
    dbCon: Connection
  }
}

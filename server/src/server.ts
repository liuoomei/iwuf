import dotenv from 'dotenv'
import fastify from 'fastify'
import cors from 'fastify-cors'
import { isProduction } from './env'
import { loggerConf } from './logger.conf'
import mysql from './plugins/mysql'
import swagger from './plugins/swagger'
import service from './service'

dotenv.config({ path: `configs/.env.${process.env.NODE_ENV || 'development'}` })

const pluginTimeout = 30000

const server = fastify({
  logger: loggerConf,
  pluginTimeout: pluginTimeout,
  // Set payload size 50M
  bodyLimit: 52428800
})

server.register(cors, { origin: '*' })
server.register(swagger)
server.register(mysql)
server.register(service)

server.addHook('onClose', async (_instance, done) => {
  server.log.info('Server is shuting down.')
  done()
})

server.listen(process.env.SERVER_PORT || 3000, process.env.SERVER_HOST || '0.0.0.0', (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  process.on('SIGINT', async () => {
    // graceful shutdown if is production
    if (isProduction) {
      await server.close()
    } else {
      server.log.info('DEV server is shutting down successfully.')
      process.exit(1)
    }
  })
})

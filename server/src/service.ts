import { FastifyPluginAsync } from 'fastify'
import autoLoad from 'fastify-autoload'
import fastifyWebsocket from 'fastify-websocket'
import { join } from 'path'
import 'reflect-metadata'
import log_hooks from './plugins/log_hooks'

const service: FastifyPluginAsync = async (service): Promise<void> => {
  service.register(log_hooks)
  service.register(fastifyWebsocket)
  const apiService: FastifyPluginAsync = async (service) => {
    service.register(autoLoad, {
      dir: join(__dirname, 'routes/api'),
      routeParams: true,
      options: { prefix: 'api' }
    })
  }

  service.register(apiService)
}

export default service

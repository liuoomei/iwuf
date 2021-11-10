import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { isProduction } from '../env'

const loggerPlugin: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {

  if (!isProduction) {
    fastify.addHook('preHandler', (req, reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body')
      }
      done()
    })
    fastify.addHook('onSend', (_, reply, payload, done) => {
      if (payload) {
        reply.log.info({ result: payload }, 'response body')
      }
      done()
    })
  }
}

export default fp(loggerPlugin, { dependencies: ['fastify-cors'] })

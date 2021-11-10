import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger'
import { isProduction } from '../env'

const swaggerPlugin: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  const swaggerConfig = (): SwaggerOptions => {
    return {
      routePrefix: '/swagger',
      openapi: {
        info: {
          title: '裁判打分系统API接口',
          description: 'Swagger For Judgement Server',
          version: '1.0.0'
        },
        servers: [
          { url: `http://localhost:${process.env.SERVER_PORT || 3000}` },
          { url: `http://192.168.1.83:${process.env.SERVER_PORT || 3000}` },
          { url: `http://192.168.2.178:${process.env.SERVER_PORT || 3000}` }
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'token',
              in: 'header'
            }
          }
        }
      },
      exposeRoute: !isProduction
    }
  }

  if (!isProduction) {
    fastify.register(fastifySwagger, swaggerConfig())
  }
}

export default fp(swaggerPlugin)

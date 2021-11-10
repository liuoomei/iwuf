import { FastifyPluginAsync, FastifySchema } from 'fastify'
import S from 'fluent-json-schema'
import { swaggerTags } from '../../utils/common'

const testApi: FastifyPluginAsync = async (fastify): Promise<void> => {

  const paramsSchema = S.object().prop('id', S.number())

  const bodySchema = S.oneOf([
    S.object().prop('type', S.string().enum(['allGroupTable', 'allScoreTable'])),
    S.object().prop('type', S.string().const('groupBattleTable')).prop('groupId', S.number()),
    S.object().prop('type', S.string().const('1vs1')).prop('battleId', S.number())
  ])


  const responseSchema = {
    200: S.object().additionalProperties(true)
  }

  const schema: FastifySchema = {
    tags: [swaggerTags.samples],
    summary: 'summary xxxxx',
    description: 'description xxxxxx',
    body: bodySchema,
    params: paramsSchema,
    response: responseSchema
  }
  fastify.post<{ Params: { id: string } }>('/test/:id', { schema: schema }, async (request, reply) => {
    reply.code(200).send({ id: request.params.id })
  })
}

export default testApi

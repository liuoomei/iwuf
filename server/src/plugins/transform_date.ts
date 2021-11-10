/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs'
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

const transformDate: FastifyPluginAsync<FastifyPluginOptions> = async (service) => {
  service.setSerializerCompiler(() => {
    return (data) => {
      if (data instanceof Object) loopObject(data)
      if (data instanceof Array) loopArray(data)
      return JSON.stringify(data)
    }
  })
}

const loopObject = function (obj: any) {
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    if (obj[key] instanceof Object && !(obj[key] instanceof Array) && !(obj[key] instanceof Date)) {
      loopObject(obj[key])
    } else if (obj[key] instanceof Array) {
      loopArray(obj[key])
    } else if (['created_at', 'updated_at'].includes(key)) {
      obj[key] = dayjs(obj[key]).format('YYYY-MM-DD HH:mm:ss')
    }
  })
}

const loopArray = function (array: any[]) {
  array.forEach((item) => {
    if (item instanceof Object && !(item instanceof Array)) {
      loopObject(item)
    } else if (item instanceof Array) {
      loopArray(item)
    }
  })
}

export default fp(transformDate)

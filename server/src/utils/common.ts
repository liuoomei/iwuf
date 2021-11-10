import S, { ArraySchema, JSONSchema, ObjectSchema } from 'fluent-json-schema'

export const pageQuerySchema = S.anyOf([
  S.object()
    .prop('paginate', S.boolean().default(true).description('是否分页, 默认分页'))
    .prop('page', S.number().description('页数，默认为1'))
    .prop('per_page', S.number().description('每页数量，默认15')),

  S.object()
    .prop('paginate', S.boolean().default(true).description('是否分页，默认分页'))
    .prop('page', S.number().description('页数，默认为1'))
    .prop('per_page', S.number().description('每页数量，默认15'))
    .prop('keywords', S.string().description('搜索关键字'))
])

export function listRspSchema (paginate: boolean, itemSchema: null | JSONSchema): ObjectSchema | ArraySchema {
  const subSchema = itemSchema === null ?
    S.object().additionalProperties(true) :
    itemSchema
  if (paginate) {
    return S.object()
      .prop('data', S.array().items(subSchema))
      .prop('pagination',
        S.object()
          .prop('page', S.number())
          .prop('per_page', S.number())
          .prop('current_page', S.number())
          .prop('total', S.number())
      )
  } else {
    return S.array().items(subSchema)
  }
}
export interface PaginateQuery {
  paginate?: boolean
  page?: number
  per_page?: number
  keywords?: string
}
export interface Pagination {
  page: number
  per_page: number
  current_page: number
  total: number
}
export type ListRsp<T> = T[] | ListWithPaginateRsp<T>
export interface ListWithPaginateRsp<T> {
  data: T[]
  pagination: Pagination
}

export const swaggerTags = {
  samples: 'xxxxxx'
}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SelectQueryBuilder } from 'typeorm'

declare module 'typeorm' {
  export interface SelectQueryBuilder<Entity> {
    paginate (paginationReq?: { page?: number, per_page?: number, raw?: boolean }): Promise<PaginationAwareObject>;
  }
}

SelectQueryBuilder.prototype.paginate =
  async function (paginationReq: { page?: number, per_page?: number, raw?: boolean }): Promise<PaginationAwareObject> {
    if (paginationReq) {
      return await paginate(this, paginationReq.page || 1, paginationReq.per_page || 15, paginationReq.raw || false)
    } else {
      return await paginate(this, 1, 15, false)
    }
  }

export const paginate = async function (builder: SelectQueryBuilder<unknown>, page: number, per_page: number, is_raw = false): Promise<PaginationAwareObject> {
  const skip = (page - 1) * per_page
  const total = builder
  const count = await total.getCount()
  let res
  if (is_raw) {
    res = await builder.offset(skip).limit(per_page).getRawMany()
  } else {
    res = await builder.skip(skip).take(per_page).getMany()
  }
  return {
    pagination: {
      page: page,
      per_page: per_page,
      total: count,
      current_page: page
    },
    data: res || []
  }
}

export interface PaginationAwareObject {
  pagination: {
    page: number | null,
    per_page: number | null,
    total: number | null,
    current_page: number
  },
  data: Array<object | unknown> | unknown
}

import type Entity from '@/types/common/Entity'

export interface GetListRequest
{
  id?: string
  limit?: number
  offset?: number
  countOnly?: boolean
}

export interface GetListResponse
{
  count: number
  rows: Entity[]
}

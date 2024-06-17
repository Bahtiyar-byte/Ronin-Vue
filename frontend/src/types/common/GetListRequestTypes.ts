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
  rows: object[]
}

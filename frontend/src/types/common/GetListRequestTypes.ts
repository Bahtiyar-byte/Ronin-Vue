export interface GetListRequest
{
  limit?: number
  offset?: number
}

export interface GetListResponse
{
  count: number
  rows: object[]
}

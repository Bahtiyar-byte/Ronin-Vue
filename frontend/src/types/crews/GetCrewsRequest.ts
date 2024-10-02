import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Crew from '@/types/crews/Crew'

export interface GetCrewRequest extends GetListRequest
{
  name?: string
}

export interface GetCrewsResponse extends GetListResponse
{
  rows: Crew[]
}

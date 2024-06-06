import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Estimate from '@/types/estimates/Estimate'

export interface GetEstimatesRequest extends GetListRequest
{
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  firstName?: string
  lastName?: string
  active?: boolean
  stage?: string
  createdAtRange?: string[]
  countOnly?: boolean
}

export interface GetEstimatesResponse extends GetListResponse
{
  rows: Estimate[]
}

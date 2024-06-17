import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Estimate from '@/types/estimates/Estimate'

export interface GetEstimatesRequest extends GetListRequest
{
  related_job?: string
}

export interface GetEstimatesResponse extends GetListResponse
{
  rows: Estimate[]
}

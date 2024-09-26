import type EstimateSection from './EstimateSection'
import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'

export interface GetEstimateSectionsRequest extends GetListRequest {
  related_estimate: string
}

export interface GetEstimateSectionsResponse extends GetListResponse
{
  rows: EstimateSection[]
}

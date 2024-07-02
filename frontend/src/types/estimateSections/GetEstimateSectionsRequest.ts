import type EstimateSection from './EstimateSection'
import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'

export interface GetEstimateSectionsRequest extends GetListRequest {}

export interface GetEstimateSectionsResponse extends GetListResponse
{
  rows: EstimateSection[]
}

import type EstimateSectionTemplate from './EstimateSectionTemplate'
import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'

export interface GetEstimateSectionTemplatesRequest extends GetListRequest {}

export interface GetEstimateSectionTemplatesResponse extends GetListResponse
{
  rows: EstimateSectionTemplate[]
}

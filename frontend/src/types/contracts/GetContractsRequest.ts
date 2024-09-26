import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Contract from '@/types/contracts/Contract'

export interface GetContractsRequest extends GetListRequest
{}

export interface GetContractsResponse extends GetListResponse
{
  rows: Contract[]
}

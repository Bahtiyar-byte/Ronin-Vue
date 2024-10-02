import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Address from '@/types/address/Address'

export interface GetAddressRequest extends GetListRequest
{
  name?: string
}

export interface GetAddressResponse extends GetListResponse
{
  rows: Address[]
}

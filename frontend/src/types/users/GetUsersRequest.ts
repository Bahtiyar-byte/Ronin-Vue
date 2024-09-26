import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type User from '@/types/users/User'

export interface GetUsersRequest extends GetListRequest
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

export interface GetUsersResponse extends GetListResponse
{
  rows: User[]
}

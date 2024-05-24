import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Contact from '@/types/contacts/Contact'

export interface GetContactsRequest extends GetListRequest
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

export interface GetContactsResponse extends GetListResponse
{
  rows: Contact[]
}

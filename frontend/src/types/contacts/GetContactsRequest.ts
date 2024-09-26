import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Contact from '@/types/contacts/Contact'

export interface GetContactsRequest extends GetListRequest
{
  name?: string
  email?: string
  phone?: string
  address?: string
  firstName?: string
  lastName?: string
  active?: boolean
  status?: string
  createdAtRange?: string[]
}

export interface GetContactsResponse extends GetListResponse
{
  rows: Contact[]
}

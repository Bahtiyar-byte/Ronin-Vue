import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Invoice from '@/types/invoices/Invoice'

export interface GetInvoicesRequest extends GetListRequest
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

export interface GetInvoicesResponse extends GetListResponse
{
  rows: Invoice[]
}

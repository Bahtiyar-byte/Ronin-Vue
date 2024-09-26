import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type { Invoice } from '@/types/invoices/Invoice'

export interface GetInvoicesRequest extends GetListRequest
{}

export interface GetInvoicesResponse extends GetListResponse
{
  rows: Invoice[]
}

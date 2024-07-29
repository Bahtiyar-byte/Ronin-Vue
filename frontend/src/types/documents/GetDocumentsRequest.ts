import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Document from '@/types/documents/Document'

export interface GetDocumentsRequest extends GetListRequest
{
  related_job?: string
}

export interface GetDocumentsResponse extends GetListResponse
{
  rows: Document[]
}

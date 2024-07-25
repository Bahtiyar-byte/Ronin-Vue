import type {
  GetListRequest,
  GetListResponse,
} from '@/types/common/GetListRequestTypes'
import type Template from '@/types/templates/Template'

export interface GetTemplatesRequest extends GetListRequest {
  name: string
  description: string
  related_trade: string
}

export interface GetTemplatesResponse extends GetListResponse {
  rows: Template[]
}

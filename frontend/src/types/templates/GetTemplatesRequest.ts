import type {
  GetListRequest,
  GetListResponse,
} from '@/types/common/GetListRequestTypes'
import type Template from '@/types/templates/Template'

export interface GetTemplatesRequest extends GetListRequest {
<<<<<<< Updated upstream
  name: string
  description: string
  related_trade: string
=======
  name?: string
  description?: string
>>>>>>> Stashed changes
}

export interface GetTemplatesResponse extends GetListResponse {
  rows: Template[]
}

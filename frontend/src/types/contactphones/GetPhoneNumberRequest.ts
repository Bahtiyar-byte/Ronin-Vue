import type {
  GetListRequest,
  GetListResponse,
} from '@/types/common/GetListRequestTypes'
import type ContactPhone from '@/types/contactphones/ContactPhone'

export interface GetPhoneNumberRequest extends GetListRequest {
  phone_number: string
  type: string
  is_primary: boolean
}

export interface GetPhoneNumerResponse extends GetListResponse {
  rows: ContactPhone[]
}

import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Appointment from '@/types/appointments/Appointment'

export interface GetAppointmentsRequest extends GetListRequest
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

export interface GetAppointmentsResponse extends GetListResponse
{
  rows: Appointment[]
}

import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Appointment from '@/types/appointments/Appointment'

export interface GetAppointmentsRequest extends GetListRequest
{}

export interface GetAppointmentsResponse extends GetListResponse
{
  rows: Appointment[]
}

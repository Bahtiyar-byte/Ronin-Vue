import type { GetListRequest, GetListResponse } from '@/types/common/GetListRequestTypes'
import type Job from '@/types/jobs/Job'

export interface GetJobsRequest extends GetListRequest
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
  related_contact?: string
}

export interface GetJobsResponse extends GetListResponse
{
  rows: Job[]
}

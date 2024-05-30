import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetJobsRequest, GetJobsResponse } from '@/types/jobs/GetJobsRequest'
import type Job from '@/types/jobs/Job'

export const useJobs = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/jobs/count?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<CountResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getList = async (requestParams: GetJobsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/jobs/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetJobsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/jobs/${id}`).get().json<Job>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (contact: Job) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/jobs/').post({
      data: contact,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (contact: Job) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/jobs/${contact.id}`).put({
      id: contact.id,
      data: contact,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteJob = async (contact: Job) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/jobs/${contact.id}`).delete().json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  return {
    count,
    getList,
    getById,
    create,
    update,
    deleteJob,
  }
}

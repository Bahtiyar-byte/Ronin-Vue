import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetJobsRequest, GetJobsResponse } from '@/types/jobs/GetJobsRequest'
import type LaborTicket from '@/types/laborTickets/LaborTicket'

export const useLaborTickets = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/labor_ticket/count?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = await useApi(url.value).get().json<CountResponse>()

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

      return `/labor_ticket/?${qParams.toString()}`
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
    } = useApi(`/labor_ticket/${id}`).get().json<LaborTicket>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (laborTicket: LaborTicket) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/labor_ticket/').post({
      data: laborTicket,
    }).json<LaborTicket>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (laborTicket: LaborTicket) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/labor_ticket/${laborTicket.id}`).put({
      id: laborTicket.id,
      data: laborTicket,
    }).json<LaborTicket>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteLaborTicket = async (laborTicket: LaborTicket) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/labor_ticket/${laborTicket.id}`).delete().json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const autocomplete = async (query: string, limit: number = 100) => {
    const {
      data,
      isFetching,
    } = await useApi(`/labor_ticket/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

    return {
      data,
      isFetching,
    }
  }

  return {
    count,
    getList,
    getById,
    create,
    update,
    deleteLaborTicket,
    autocomplete,
  }
}

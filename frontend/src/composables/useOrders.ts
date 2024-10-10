import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetJobsRequest, GetJobsResponse } from '@/types/jobs/GetJobsRequest'
import type Order from '@/types/orders/Order'

export const useOrders = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/orders/count?${qParams.toString()}`
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

      return `/orders/?${qParams.toString()}`
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
    } = useApi(`/orders/${id}`).get().json<Order>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (order: Order) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/orders/').post({
      data: order,
    }).json<Order>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (order: Order) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/orders/${order.id}`).put({
      id: order.id,
      data: order,
    }).json<Order>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteOrder = async (job: Job) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/orders/${job.id}`).delete().json<boolean>()

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
    } = await useApi(`/orders/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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
    deleteOrder,
    autocomplete,
  }
}

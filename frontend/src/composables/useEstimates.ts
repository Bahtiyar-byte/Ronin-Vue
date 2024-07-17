import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetEstimatesRequest, GetEstimatesResponse } from '@/types/estimates/GetEstimatesRequest'
import type Estimate from '@/types/estimates/Estimate'

export const useEstimates = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/estimates/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetEstimatesRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/estimates/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetEstimatesResponse>()

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
    } = useApi(`/estimates/${id}`).get().json<Estimate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (estimate: Partial<Estimate>) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/estimates/').post({
      data: estimate,
    }).json<Estimate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (estimate: Estimate) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/estimates/${estimate.id}`).put({
      id: estimate.id,
      data: estimate,
    }).json<Estimate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteEstimate = async (estimate: Estimate) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/estimates/${estimate.id}`).delete().json<boolean>()

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
    } = await useApi(`/estimates/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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
    deleteEstimate,
    autocomplete,
  }
}

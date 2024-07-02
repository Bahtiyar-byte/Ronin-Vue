import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetEstimateSectionsRequest, GetEstimateSectionsResponse } from '@/types/estimateSections/GetEstimateSectionsRequest'
import type EstimateSection from '@/types/estimateSections/EstimateSection'

export const useEstimateSections = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/estimate_sections/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetEstimateSectionsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/estimate_sections/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetEstimateSectionsResponse>()

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
    } = useApi(`/estimate_sections/${id}`).get().json<EstimateSection>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (estimateSection: EstimateSection) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/estimate_sections/').post({
      data: estimateSection,
    }).json<EstimateSection>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (estimateSection: EstimateSection) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/estimate_sections/${estimateSection.id}`).put({
      id: estimateSection.id,
      data: estimateSection,
    }).json<EstimateSection>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteEstimate = async (estimateSection: EstimateSection) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/estimate_sections/${estimateSection.id}`).delete().json<boolean>()

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
    } = await useApi(`/estimate_sections/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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

import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetEstimateSectionTemplatesRequest, GetEstimateSectionTemplatesResponse } from '@/types/estimateSectionTemplates/GetEstimateSectionTemplatesRequest'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'

export const useEstimateSectionTemplates = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/templates/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetEstimateSectionTemplatesRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/templates/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetEstimateSectionTemplatesResponse>()

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
    } = useApi(`/templates/${id}`).get().json<EstimateSectionTemplate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (estimateSectionTemplate: EstimateSectionTemplate) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/templates/').post({
      data: estimateSectionTemplate,
    }).json<EstimateSectionTemplate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (estimateSectionTemplate: EstimateSectionTemplate) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/templates/${estimateSectionTemplate.id}`).put({
      id: estimateSectionTemplate.id,
      data: estimateSectionTemplate,
    }).json<EstimateSectionTemplate>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteEstimateSectionTemplate = async (estimateSectionTemplate: EstimateSectionTemplate) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/templates/${estimateSectionTemplate.id}`).delete().json<boolean>()

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
    } = await useApi(`/templates/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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
    deleteEstimateSectionTemplate,
    autocomplete,
  }
}

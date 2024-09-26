import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetDocumentsRequest, GetDocumentsResponse } from '@/types/documents/GetDocumentsRequest'

import type Document from '@/types/documents/Document'

export const useDocuments = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/documents/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetDocumentsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/documents/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetDocumentsResponse>()

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
    } = useApi(`/documents/${id}`).get().json<Document>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (document: Partial<Document>) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/documents/').post({
      data: document,
    }).json<Document>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (document: Document) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/documents/${document.id}`).put({
      id: document.id,
      data: document,
    }).json<Document>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteDocument = async (document: Document) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/documents/${document.id}`).delete().json<boolean>()

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
    } = await useApi(`/documents/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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
    deleteDocument,
    autocomplete,
  }
}

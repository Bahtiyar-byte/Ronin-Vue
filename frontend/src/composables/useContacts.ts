import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'

export const useContacts = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/contacts/count?${qParams.toString()}`
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

  const getList = async () => {

  }

  return {
    count,
    getList,
  }
}

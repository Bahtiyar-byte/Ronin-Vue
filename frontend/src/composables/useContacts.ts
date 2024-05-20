import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountResonse'

export const useContacts = () => {
  const count = async (params: Record<string, string>) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params)

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

  return {
    count,
  }
}

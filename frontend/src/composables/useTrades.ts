import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetContactsRequest,
  GetContactsResponse,
} from '@/types/contacts/GetContactsRequest'
import type Trade from '@/types/trades/Trade'

export const useTrades = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/trades/count?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = await useApi(url.value)
      .get()
      .json<CountResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getList = async (requestParams: GetContactsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/trades/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetContactsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/trades/${id}`)
      .get()
      .json<Trade>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (trade: Trade) => {
    const { data, isFetching, error } = useApi('/trades/')
      .post({
        data: trade,
      })
      .json<Trade>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (trade: Trade) => {
    const { data, isFetching, error } = useApi(`/trades/${trade.id}`)
      .put({
        id: trade.id,
        data: trade,
      })
      .json<Trade>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteContact = async (trade: Trade) => {
    const { data, isFetching, error } = useApi(`/trades/${trade.id}`)
      .delete()
      .json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const autocomplete = async (query: string, limit: number = 100) => {
    const { data, isFetching } = await useApi(
      `/trades/autocomplete/?query=${query}&limit=${limit}`,
    ).json<{ id: string; label: string }[]>()

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
    deleteContact,
    autocomplete,
  }
}

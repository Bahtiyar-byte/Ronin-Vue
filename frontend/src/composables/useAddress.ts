import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetAddressRequest,
  GetAddressResponse,
} from '@/types/address/GetAddressRequest'
import type Address from '@/types/address/Address'

export const useAddress = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/address/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetAddressRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/address/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetAddressResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/address/${id}`)
      .get()
      .json<Address>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (address: Address) => {
    const { data, isFetching, error } = useApi('/address')
      .post({
        data: address,
      })
      .json<Address>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (address: Address) => {
    const { data, isFetching, error } = useApi(`/address/${address.id}`)
      .put({
        id: address.id,
        data: address,
      })
      .json<Address>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteAddress = async (address: Address) => {
    const { data, isFetching, error } = useApi(`/address/${address.id}`)
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
      `/address/autocomplete/?query=${query}&limit=${limit}`,
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
    deleteAddress,
    autocomplete,
  }
}

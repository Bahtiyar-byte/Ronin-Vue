import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type Contract from '@/types/contracts/Contract'
import type {
  GetContractsRequest,
  GetContractsResponse,
} from '@/types/contracts/GetContractsRequest'

export const useContracts = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/contracts/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetContractsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/contracts/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetContractsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/contracts/${id}`)
      .get()
      .json<Contract>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (contract: Contract) => {
    const { data, isFetching, error } = useApi('/contracts/')
      .post({
        data: contract,
      })
      .json<Contract>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (contract: Contract) => {
    const { data, isFetching, error } = useApi(`/contracts/${contract.id}`)
      .put({
        id: contract.id,
        data: contract,
      })
      .json<Contract>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteContract = async (contract: Contract) => {
    const { data, isFetching, error } = useApi(`/contracts/${contract.id}`)
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
      `/contracts/autocomplete/?query=${query}&limit=${limit}`,
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
    deleteContract,
    autocomplete,
  }
}

import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetCrewRequest,
  GetCrewsResponse,
} from '@/types/crew/GetCrewsRequest'
import type Crew from '@/types/crews/Crew'

export const useCrews = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/crew/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetCrewRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/crew/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetCrewsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/crew/${id}`)
      .get()
      .json<Crew>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (crew: Crew) => {
    const { data, isFetching, error } = useApi('/crew')
      .post({
        data: crew,
      })
      .json<Crew>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (crew: Crew) => {
    const { data, isFetching, error } = useApi(`/crew/${crew.id}`)
      .put({
        id: crew.id,
        data: crew,
      })
      .json<Crew>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteContact = async (crew: Crew) => {
    const { data, isFetching, error } = useApi(`/crew/${crew.id}`)
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
      `/crew/autocomplete/?query=${query}&limit=${limit}`,
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

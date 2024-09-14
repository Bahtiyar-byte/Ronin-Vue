import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetContactsRequest,
  GetContactsResponse,
} from '@/types/contacts/GetContactsRequest'
import type Role from '@/types/roles/Role'

export const useRoles = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/roles/count?${qParams.toString()}`
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

      return `/roles/?${qParams.toString()}`
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
    const { data, isFetching, error } = useApi(`/roles/${id}`)
      .get()
      .json<Role>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (role: Role) => {
    const { data, isFetching, error } = useApi('/roles/')
      .post({
        data: role,
      })
      .json<Role>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (role: Role) => {
    const { data, isFetching, error } = useApi(`/roles/${role.id}`)
      .put({
        id: role.id,
        data: role,
      })
      .json<Role>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteContact = async (role: Role) => {
    const { data, isFetching, error } = useApi(`/roles/${role.id}`)
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
      `/roles/autocomplete/?query=${query}&limit=${limit}`,
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

import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetContactsRequest,
  GetContactsResponse,
} from '@/types/contacts/GetContactsRequest'
import type Permission from '@/types/permissions/Permission'

export const usePermissions = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/permissions/count?${qParams.toString()}`
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

      return `/permissions/?${qParams.toString()}`
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
    const { data, isFetching, error } = useApi(`/permissions/${id}`)
      .get()
      .json<Permission>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (permission: Permission) => {
    const { data, isFetching, error } = useApi('/permissions/')
      .post({
        data: permission,
      })
      .json<Permission>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (permission: Permission) => {
    const { data, isFetching, error } = useApi(`/permissions/${permission.id}`)
      .put({
        id: permission.id,
        data: permission,
      })
      .json<Permission>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deletePermission = async (permission: Permission) => {
    const { data, isFetching, error } = useApi(`/permissions/${permission.id}`)
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
      `/permissions/autocomplete/?query=${query}&limit=${limit}`,
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
    deletePermission,
    autocomplete,
  }
}

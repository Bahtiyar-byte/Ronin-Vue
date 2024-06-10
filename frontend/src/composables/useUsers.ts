import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetUsersRequest, GetUsersResponse } from '@/types/users/GetUsersRequest'
import type User from '@/types/users/User'

export const useUsers = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/users/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetUsersRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/users/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetUsersResponse>()

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
    } = useApi(`/users/${id}`).get().json<User>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (user: User) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/users/').post({
      data: user,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (user: User) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/users/${user.id}`).put({
      id: user.id,
      data: user,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteUser = async (user: User) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/users/${user.id}`).delete().json<boolean>()

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
    } = await useApi(`/users/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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
    deleteUser,
    autocomplete,
  }
}

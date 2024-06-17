import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetContactsRequest, GetContactsResponse } from '@/types/contacts/GetContactsRequest'
import type Contact from '@/types/contacts/Contact'

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
    } = await useApi(url.value).get().json<CountResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getList = async (requestParams: GetContactsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/contacts/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetContactsResponse>()

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
    } = useApi(`/contacts/${id}`).get().json<Contact>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (contact: Contact) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/contacts/').post({
      data: contact,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (contact: Contact) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/contacts/${contact.id}`).put({
      id: contact.id,
      data: contact,
    }).json<Contact>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteContact = async (contact: Contact) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/contacts/${contact.id}`).delete().json<boolean>()

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
    } = await useApi(`/contacts/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

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

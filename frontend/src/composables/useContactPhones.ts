import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetPhoneNumberRequest,
  GetPhoneNumerResponse,
} from '@/types/contactphones/GetPhoneNumberRequest'
import type ContactPhone from '@/types/contactphones/ContactPhone'

export const useContactPhones = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/contact_phones/count?${qParams.toString()}`
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

  const getList = async (requestParams: Partial<GetPhoneNumberRequest>) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/contact_phones/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetPhoneNumerResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/contact_phones/${id}`)
      .get()
      .json<ContactPhone>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (contactPhone: ContactPhone) => {
    const { data, isFetching, error } = useApi('/contact_phones/')
      .post({
        data: contactPhone,
      })
      .json<ContactEmail>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (contactPhone: ContactPhone) => {
    const { data, isFetching, error } = useApi(`/contact_phones/${contactPhone.id}`)
      .put({
        id: contactPhone.id,
        data: contactPhone,
      })
      .json<ContactPhone>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deletePhone = async (contactPhone: ContactPhone) => {
    const { data, isFetching, error } = useApi(`/contact_phones/${contactPhone.id}`)
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
      `/contact_phones/autocomplete/?query=${query}&limit=${limit}`,
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
    deletePhone,
    autocomplete,
  }
}

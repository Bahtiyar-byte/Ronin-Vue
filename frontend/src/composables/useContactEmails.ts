import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetTemplatesRequest,
  GetTemplatesResponse,
} from '@/types/templates/GetTemplatesRequest'
import type ContactEmail from '@/types/contactemails/ContactEmail'

export const useContactEmails = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/contact_emails/count?${qParams.toString()}`
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

  const getList = async (requestParams: Partial<GetTemplatesRequest>) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/contact_emails/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetTemplatesResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/contact_emails/${id}`)
      .get()
      .json<ContactEmail>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (contactemail: ContactEmail) => {
    const { data, isFetching, error } = useApi('/contact_emails/')
      .post({
        data: contactemail,
      })
      .json<ContactEmail>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (contactEmail: ContactEmail) => {
    const { data, isFetching, error } = useApi(`/contact_emails/${contactEmail.id}`)
      .put({
        id: contactEmail.id,
        data: contactEmail,
      })
      .json<ContactEmail>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteEmail = async (contactEmail: ContactEmail) => {
    const { data, isFetching, error } = useApi(`/contact_emails/${contactEmail.id}`)
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
      `/contact_emails/autocomplete/?query=${query}&limit=${limit}`,
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
    deleteEmail,
    autocomplete,
  }
}

import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetInvoicesRequest, GetInvoicesResponse } from '@/types/invoices/GetInvoicesRequest'
import type { Invoice } from '@/types/invoices/Invoice'

export const useInvoices = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/invoices/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetInvoicesRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/invoices/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetInvoicesResponse>()

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
    } = useApi(`/invoices/${id}`).get().json<Invoice>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (invoice: Invoice) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/invoices/').post({
      data: invoice,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (invoice: Invoice) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/invoices/${invoice.id}`).put({
      id: invoice.id,
      data: invoice,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteInvoice = async (invoice: Invoice) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/invoices/${invoice.id}`).delete().json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  return {
    count,
    getList,
    getById,
    create,
    update,
    deleteInvoice,
  }
}

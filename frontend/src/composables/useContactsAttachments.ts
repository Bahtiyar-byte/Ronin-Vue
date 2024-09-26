import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'

export const useContactsAttachments = () => {
  const countDocuments = async (params: object) => {
    const qParams = new URLSearchParams(params as Record<string, string>)

    const {
      data,
      isFetching,
      error,
      response,
    } = await useApi(`contact-attachments/documents/count/?${qParams.toString()}`)
      .get()
      .json<CountResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const countInvoices = async (params: object) => {
    const qParams = new URLSearchParams(params as Record<string, string>)

    const {
      data,
      isFetching,
      error,
      response,
    } = await useApi(`contact-attachments/invoices/count/?${qParams.toString()}`)
      .get()
      .json<CountResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  return {
    countDocuments,
    countInvoices,
  }
}

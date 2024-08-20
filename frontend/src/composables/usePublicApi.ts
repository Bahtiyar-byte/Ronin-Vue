import { useApi } from './useApi'
import type Contract from '@/types/contracts/Contract'

export const usePublicApi = () => {
  const getContractAcceptanceData = async (id: string) => {
    const {
      data,
    } = await useApi(`/public/contact-acceptance/${id}`).get().json<{ contract: Partial<Contract> }>()

    return {
      data,
    }
  }

  const acceptContract = async (id: string) => {
    const {
      data,
      isFetching,
    } = await useApi(`/public/contact-acceptance/${id}`).post().json<{ accepted: boolean }>()

    return {
      data,
      isFetching,
    }
  }

  return {
    getContractAcceptanceData,
    acceptContract,
  }
}

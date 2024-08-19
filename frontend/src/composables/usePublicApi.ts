import { useApi } from './useApi'
import type Contract from '@/types/contracts/Contract'

export const usePublicApi = () => {
  const getContractAcceptanceData = async (id: string) => {
    const {
      data,
    } = await useApi(`/public/contact-acceptance`).get().json<Partial<Contract>>()

    // /${id}

    return {
      data,
    }
  }

  return {
    getContractAcceptanceData,
  }
}

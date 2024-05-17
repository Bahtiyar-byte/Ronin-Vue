import { useApi } from './useApi'
import type LocalLoginRequest from '@/types/auth/LocalLoginRequest'

export const useAuth = () => {
  const login = async (req: LocalLoginRequest) => {
    const {
      data,
      isFetching,
      error,
      response,
    } = useApi('auth/signin/local').post(req).text()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  return {
    login,
  }
}

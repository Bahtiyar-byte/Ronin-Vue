import { useApi } from './useApi'
import type LocalLoginRequest from '@/types/auth/LocalLoginRequest'
import type User from '@/types/users/User'

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

  const me = async () => {
    const {
      data,
      isFetching,
      error,
      response,
    } = useApi('auth/me').get().json<User>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  return {
    login,
    me,
  }
}

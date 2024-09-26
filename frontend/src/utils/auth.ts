import type { Router } from 'vue-router'
import type User from '@/types/users/User'

export const logout = async (router: Router): Promise<{
  result: any
  isLoading: any
  errors: any
}> => {
  // const { result, errors, isLoading } = await useUser().logout()

  useCookie('accessToken').value = null
  await router.push({ name: 'auth-login' })

  return { result: {}, errors: {}, isLoading: {} }
}

export const resolveUserName = (user: User): string => {
  const { name, firstName, lastName } = user

  if (name) {
    return name
  }

  const filteredParts = [firstName, lastName].filter(Boolean).join(' ')

  if (filteredParts) {
    return filteredParts
  }

  return user.email
}

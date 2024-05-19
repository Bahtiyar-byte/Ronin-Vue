import type { Router } from 'vue-router'

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

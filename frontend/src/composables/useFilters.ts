import { useApi } from './useApi'

export const useFilters = () => {
  const getVariants = async (entity: string, column: string) => {
    const {
      data,
      isFetching,
    } = await useApi(`/filters/variants?entity=${entity}&column=${column}`).get().json<string[]>()

    return {
      data,
      isFetching,
    }
  }

  return {
    getVariants,
  }
}

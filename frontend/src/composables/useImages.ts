import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type {
  GetContactsRequest,
  GetContactsResponse,
} from '@/types/contacts/GetContactsRequest'
import type Image from '@/types/images/Image'

export const useImages = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/images/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetContactsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/images/?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetContactsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getCurrentUserImagesList = async (requestParams: GetContactsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>,
      )

      return `/images/currentUser?${qParams.toString()}`
    })

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetContactsResponse>()

    return {
      data,
      isFetching,
      error,
      response,
    }
  }

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/images/${id}`)
      .get()
      .json<Image>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (formData: any) => {
    // const response = await fetch('https://api.example.com/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    const { data, isFetching, error } = useApi('/images/')
      .post(
        formData
      )
      .json<Image>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (image: Image) => {
    const { data, isFetching, error } = useApi(`/images/${image.id}`)
      .put({
        id: image.id,
        data: image,
      })
      .json<Image>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteImage = async (image: Image) => {
    const { data, isFetching, error } = useApi(`/images/${image.id}`)
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
      `/images/autocomplete/?query=${query}&limit=${limit}`,
    ).json<{ id: string; label: string }[]>()

    return {
      data,
      isFetching,
    }
  }

  return {
    count,
    getList,
    getCurrentUserImagesList,
    getById,
    create,
    update,
    deleteImage,
    autocomplete,
  }
}

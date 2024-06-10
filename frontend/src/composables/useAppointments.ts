import { useApi } from './useApi'
import type CountResponse from '@/types/common/CountRequestTypes'
import type { GetAppointmentsRequest, GetAppointmentsResponse } from '@/types/appointments/GetAppointmentsRequest'
import type Appointment from '@/types/appointments/Appointment'

export const useAppointments = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>)

      return `/appointments/count?${qParams.toString()}`
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

  const getList = async (requestParams: GetAppointmentsRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(requestParams as Record<string, string>)

      return `/appointments/?${qParams.toString()}`
    })

    const {
      data,
      isFetching,
      error,
      response,
    } = useApi(url.value).get().json<GetAppointmentsResponse>()

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
    } = useApi(`/appointments/${id}`).get().json<Appointment>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const create = async (appointment: Appointment) => {
    const {
      data,
      isFetching,
      error,
    } = useApi('/appointments/').post({
      data: appointment,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const update = async (appointment: Appointment) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/appointments/${appointment.id}`).put({
      id: appointment.id,
      data: appointment,
    }).json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const deleteAppointment = async (appointment: Appointment) => {
    const {
      data,
      isFetching,
      error,
    } = useApi(`/appointments/${appointment.id}`).delete().json<boolean>()

    return {
      data,
      isFetching,
      error,
    }
  }

  const autocomplete = async (query: string, limit: number = 100) => {
    const {
      data,
      isFetching,
    } = await useApi(`/appointments/autocomplete/?query=${query}&limit=${limit}`).json<{ id: string; label: string }[]>()

    return {
      data,
      isFetching,
    }
  }

  return {
    count,
    getList,
    getById,
    create,
    update,
    deleteAppointment,
    autocomplete,
  }
}

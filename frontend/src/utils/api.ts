import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
})

export const getResponseText = async (res: Response): Promise<string> => {
  if (res.body === null) {
    return ''
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let result = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    result += decoder.decode(value, { stream: true })
  }

  result += decoder.decode()

  return result
}

export const prepareEntityToUpdate = (entity: Record<string, any>): Record<string, any> => {
  const updatedEntity: Record<string, any> = {}

  for (const key in entity) {
    if (Object.prototype.hasOwnProperty.call(entity, key)) {
      if (
        (key.endsWith('Id') && (key.startsWith('related_') || key.startsWith('assigned_')))
        || key === 'related_contact'
      ) {
        const newKey = key.slice(0, -2)

        updatedEntity[newKey] = entity[key]
      } else if (updatedEntity[key] === undefined) {
        updatedEntity[key] = entity[key]
      }
    }
  }

  return updatedEntity
}

export const fetchAutocomplete = async (query: string, autocompleteFn: (query: string) => Promise<any>) => {
  const { data } = await autocompleteFn(query)
  if (data.value === null) {
    return
  }

  return data.value.map((item: any) => ({ value: item.id, title: item.label }))
}

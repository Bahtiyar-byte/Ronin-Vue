import type SendEmailHandlerAdditionalData from '@/types/common/SendEmailHandlerAdditionalData'

export const snakeToCamel = (str: string): string => {
  return str.replace(/(_\w)/g, (match: string) => match[1].toUpperCase())
}

export const splitOnce = (str: string, delimiter: string): string[] => {
  const index = str.indexOf(delimiter)
  if (index === -1) {
    return [str]
  }

  return [str.substring(0, index), str.substring(index + 1)]
}

export const formatPrice = (val: number, symbol: string = '$'): string => {
  console.log(val)

  return `${symbol}${val.toFixed(2)}`
}

export const entityToFormData = <T>(prefix: string, entity: T, additionalData?: Partial<SendEmailHandlerAdditionalData>): FormData => {
  const formData = new FormData()

  for (const key in entity) {
    if (entity[key as keyof T] !== undefined) {
      formData.append(`${prefix}[${key}]`, entity[key as keyof T] as string | Blob)
    }
  }

  for (const key in additionalData) {
    if (additionalData[key as keyof SendEmailHandlerAdditionalData] !== undefined) {
      if (key === 'attachments') {
        (additionalData.attachments as Blob[]).forEach((attachment, index) => {
          formData.append('attachments', attachment, `attachment_${index}.pdf`)
        })
      } else {
        formData.append(`additionalData[${key}]`, additionalData[key as keyof SendEmailHandlerAdditionalData] as string | Blob)
      }
    }
  }

  return formData
}

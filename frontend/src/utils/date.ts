import phpFormatDate from 'php-date'

export const stringToDate = (input: string) => {
  const [year, month, day] = input.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export const unixTimestampToDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000)
}

const prepareDate = (date?: Date | number): { _date: Date } => {
  let _date: Date

  if (typeof date === 'number') {
    _date = unixTimestampToDate(date)
  } else if (date === undefined) {
    _date = new Date()
  } else {
    _date = date
  }

  return { _date }
}

export const formatDateTime = (format?: string, date?: Date | number): string => {
  const { _date } = prepareDate(date)

  return phpFormatDate(format ?? 'm-d-Y', _date)
}

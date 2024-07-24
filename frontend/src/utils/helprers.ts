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

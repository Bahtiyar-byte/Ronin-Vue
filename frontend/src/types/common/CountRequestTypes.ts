export default interface CountResponse
{
  count: number
}

export interface FetchCountFunction {
  (params: object): Promise<{ data: Ref<{ count: number } | null> }>
}

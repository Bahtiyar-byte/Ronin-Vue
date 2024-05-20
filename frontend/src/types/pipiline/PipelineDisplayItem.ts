import type { RouteLocationRaw } from 'vue-router'

export interface IPipelineDisplayItem {
  title: string
  amount: number
  url: RouteLocationRaw
  icon?: string
  amountSubtitle?: string
}

export default class PipelineDisplayItem implements IPipelineDisplayItem {
  constructor(
    public title: string,
    public amount: number,
    public url: RouteLocationRaw,
    public icon?: string,
    public amountSubtitle?: string,
  ) {}
}

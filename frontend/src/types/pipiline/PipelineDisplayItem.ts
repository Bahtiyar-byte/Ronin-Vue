import type { RouteLocationRaw } from 'vue-router'
import type { AbilityRule } from '@/types/roles/Role'

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
    public permission: AbilityRule,
    public icon?: string,
    public amountSubtitle?: string,
  ) {}
}

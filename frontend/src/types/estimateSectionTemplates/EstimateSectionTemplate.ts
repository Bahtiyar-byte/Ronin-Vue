import type Entity from '@/types/common/Entity'

export default interface EstimateSectionTemplate extends Entity {
  name: string
  description: string
  related_trade: any | string
  relatedTradeId?: string
}

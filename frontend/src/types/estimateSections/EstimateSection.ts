import type Entity from '@/types/common/Entity'

export default interface EstimateSection extends Entity {
  name: string
  description: string
  amount: number
  material_price: number
  labor_price: number
}

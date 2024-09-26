import type Entity from '@/types/common/Entity'
import type Estimate from '@/types/estimates/Estimate'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'

export default interface EstimateSection extends Entity {
  name: string
  description: string
  amount: number
  material_price: number
  labor_price: number
  related_estimate: Estimate | string
  related_template: EstimateSectionTemplate | string
}

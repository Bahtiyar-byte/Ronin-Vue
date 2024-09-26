import type Contact from '@/types/contacts/Contact'
import type Job from '@/types/jobs/Job'
import type Entity from '@/types/common/Entity'
import type EstimateSection from '@/types/estimateSections/EstimateSection'

export default interface Estimate extends Entity {
  labor_cost?: number | null
  markup?: number | null
  profit_margin?: number | null
  total_price?: number | null
  related_contact?: Contact | null
  related_contactId?: string | null
  related_job?: Job | string | null
  related_jobId?: string | null
  material_cost?: number | null
  name?: string | null
  description?: string | null
  trade?: string | null
  template_used?: string | null
  unit_of_measurement?: string | null
  sections?: Partial<EstimateSection>[]
  estimate_sections_related_estimate?: Partial<EstimateSection>[]
}

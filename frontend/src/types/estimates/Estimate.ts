import type Contact from '@/types/contacts/Contact'
import type Job from '@/types/jobs/Job'

export default interface Estimate {
  id?: string
  createdById?: string | null
  updatedById?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
  labor_cost?: number | null
  markup?: number | null
  profit_margin?: number | null
  total_price?: number | null
  related_contact?: Contact | null
  related_contactId?: string | null
  related_job?: Job | string | null
  related_jobId?: string | null
  material_cost?: number | null
  importHash?: string | null
  name?: string | null
  description?: string | null
  trade?: string | null
  template_used?: string | null
  unit_of_measurement?: string | null
}

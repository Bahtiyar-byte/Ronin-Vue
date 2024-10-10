import type Contact from '@/types/contacts/Contact'
import type User from '@/types/users/User'
import type Entity from '@/types/common/Entity'

export default interface Order extends Entity {
  order_name?: string
  order_number?: string | null
  order_po_number?: string
  crew_instructions?: string
  notes?: string | null
  related_jobId?: string | null
  related_estimateId?: string | null
  assigned_toId?: string | null
  assigned_to?: User | null
  related_estimate?: any | null
  related_job?: any | null
  material_description?: string | null
  quantity?: string | null
  unit?: any[]
  total_amount?: any[]
  related_trade: string | null
  createdAt: string | null
}

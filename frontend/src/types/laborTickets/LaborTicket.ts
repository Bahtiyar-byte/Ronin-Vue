import type User from '@/types/users/User'
import type Entity from '@/types/common/Entity'

export default interface LaborTicket extends Entity {
  name?: string
  related_jobId?: string | null
  start_date?: string
  end_date?: string
  crew_instructions?: string | null
  actual_start_time?: string | null
  actual_end_time?: string | null
  crew_actions?: string | null
  labor_process?: string | null
  disclaimer?: User | null
  related_orderId?: string | null
  createdAt: string | null
}

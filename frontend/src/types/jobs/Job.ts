import type Contact from '@/types/contacts/Contact'
import type User from '@/types/users/User'
import type Entity from '@/types/common/Entity'

export default interface Job extends Entity {
  name?: string
  description?: string | null
  category?: string
  type?: string
  status?: string
  address?: string | null
  related_contactId?: string
  related_contact?: Contact | null
  related_estimateId?: string | null
  assigned_toId?: string | null
  assigned_to?: User | null
  related_estimate?: any | null
  start_date?: string | null
  end_date?: string | null
  main_image?: any[]
  documents?: any[]
}

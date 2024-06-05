import type Contact from '@/types/contacts/Contact'

export default interface Job {
  id?: string // Undefined if new job creation
  name?: string
  description?: string | null
  category?: string
  type?: string
  status?: string
  address?: string | null
  importHash?: string | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  createdById?: string | null
  updatedById?: string | null
  related_contactId?: string
  related_contact?: Contact | null
  related_estimateId?: string | null
  assigned_toId?: string | null
  assigned_to?: any | null
  related_estimate?: any | null
  start_date?: string | null
  end_date?: string | null
  main_image?: any[]
  documents?: any[]
}

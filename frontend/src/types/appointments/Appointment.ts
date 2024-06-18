import type User from '@/types/users/User'
import type Job from '@/types/jobs/Job'
import type Contact from '@/types/contacts/Contact'

export default interface Appointment {
  id: string
  subject: string
  start_time: string
  end_time: string
  notes: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  assigned_toId: string
  related_jobId: string
  related_contactId: string
  createdById: string | null
  updatedById: string | null
  assigned_to: User
  related_job: Job
  related_contact: Contact
}

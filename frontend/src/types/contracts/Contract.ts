import type Contact from '@/types/contacts/Contact'
import type Job from '@/types/jobs/Job'
import type Entity from '@/types/common/Entity'

export default interface Contract extends Entity {
  name: string
  amount: number
  body: string
  signed_date: Date | string
  related_contact: Contact
  related_contactId: string
  related_job?: Job
  related_jobId: string
}

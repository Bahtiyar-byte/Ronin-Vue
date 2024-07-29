import type Entity from '@/types/common/Entity'
import Job from '@/types/jobs/Job'

export interface InvoiceDocument extends Entity {
  name: string
  url: string
}

export interface Invoice extends Entity {
  invoice_number: string
  invoice_date: Date | string
  terms: string
  approved_job_value: Job | string
  balance_amount: number
  job: Job
}

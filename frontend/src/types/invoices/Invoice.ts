import type Entity from '@/types/common/Entity'

export interface InvoiceDocument extends Entity {
  name: string
  url: string
}

export interface Invoice extends Entity {
  number: number
  documentId: string
  document: InvoiceDocument
  job: any[]
  estimate: any[]
}

export interface InvoiceDocument {
  id: string
  name: string
  url: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdById: string | null
  updatedById: string | null
}

export interface Invoice {
  id?: string // Undefined if new invoice creation
  number: number
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  documentId: string
  createdById: string | null
  updatedById: string | null
  document: InvoiceDocument
  job: any[]
  estimate: any[]
}

export default interface Contact {
  id?: string // Undefined if new contact creation
  name: string
  email: string
  phone: string
  address: string
  firstName: string
  lastName: string
  status: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdById: string | null
  updatedById: string | null
  job: any[]
  estimate: any[]
  appointment: any[]
}

export default interface Contact {
  id: string
  name: string
  email: string
  phone: string
  address: string
  firstName: string
  lastName: string
  stage: string
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

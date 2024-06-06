export default interface Appointment {
  id: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdById: string | null
  updatedById: string | null
}

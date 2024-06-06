export default interface Estimate {
  id: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdById: string | null
  updatedById: string | null
}

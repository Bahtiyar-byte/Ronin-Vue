export default interface Entity {
  id?: string // Undefined if new entity creation
  importHash: string | null
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | null | Date
  createdById: string | null
  updatedById: string | null
}

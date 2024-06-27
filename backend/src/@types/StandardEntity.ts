
export default interface StandardEntity
{
    id: string
    importHash: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    createdById: string
    updatedById: string
}

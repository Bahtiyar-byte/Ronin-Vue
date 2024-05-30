export default interface Job {
  id?: string // Undefined if new job creation
  name: string
  category: string
  type: string
  status: string
  importHash: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdById: string | null
  updatedById: string | null
  contact: any[]
  assignedUser: any[]
  assignedTeam: any[]
  estimate: any[]
  appointment: any[]
  image: any[]
  document: any[]
  invoice: any[]
}

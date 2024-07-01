import type Entity from '@/types/common/Entity'

export default interface Contact extends Entity {
  name: string
  email: string
  phone: string
  address: string
  firstName: string
  lastName: string
  status: string
  job: any[]
  estimate: any[]
  appointment: any[]
}

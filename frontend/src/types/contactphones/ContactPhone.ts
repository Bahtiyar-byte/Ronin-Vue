import type Entity from '@/types/common/Entity'

export default interface ContactPhone extends Entity {
  id?: any
  phone_number: string
  type: string
  is_primary: boolean
}

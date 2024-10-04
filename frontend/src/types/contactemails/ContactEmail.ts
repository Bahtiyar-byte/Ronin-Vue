import type Entity from '@/types/common/Entity'

export default interface ContactEmail extends Entity {
  id?: any
  email: string
  type: string
}

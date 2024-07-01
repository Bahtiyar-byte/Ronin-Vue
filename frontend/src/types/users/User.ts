import type Entity from '@/types/common/Entity'

export default interface User extends Entity {
  firstName: string
  lastName: null | string
  phoneNumber: null | string
  email: string
  disabled: boolean
  emailVerified: boolean
  emailVerificationToken: null | string
  emailVerificationTokenExpiresAt: null | string
  passwordResetToken: null | string
  passwordResetTokenExpiresAt: null | string
  provider: string
  name: null | string
  avatar: []
  roleId: []
}

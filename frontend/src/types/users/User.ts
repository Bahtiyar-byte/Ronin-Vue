import type Entity from '@/types/common/Entity'
import type { Permission } from '@/types/roles/Role'

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
  name: string
  avatar: []
  roleId: []
}

export interface CurrentUser extends User {
  app_role_permissions: Permission[]
}

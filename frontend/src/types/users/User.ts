export default interface User {
  id: string
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
  importHash: null | string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdById: string
  updatedById: string
  avatar: []
  roleId: []
}

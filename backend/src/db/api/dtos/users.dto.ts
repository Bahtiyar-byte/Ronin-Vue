export interface UserDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  disabled?: boolean;
  password?: string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date | null;
  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: Date | null;
  provider?: string;
  importHash?: string;
  createdById?: string;
  updatedById?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  app_role?: string;
  custom_permissions?: string[];
  avatar?: any; // Replace `any` with the appropriate type for avatar if known
}

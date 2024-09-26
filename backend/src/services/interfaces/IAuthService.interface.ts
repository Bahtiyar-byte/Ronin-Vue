import { UserDTO } from '../../db/api/dtos/users.dto';

interface Options {
  currentUser?: UserDTO;
}

interface IAuthService {
  signup(
    email: string,
    password: string,
    options?: Options,
    host?: string,
  ): Promise<string>;
  signin(email: string, password: string, options?: Options): Promise<string>;
  sendEmailAddressVerificationEmail(email: string, host: string): Promise<void>;
  sendPasswordResetEmail(
    email: string,
    type?: 'register' | 'invitation',
    host?: string,
  ): Promise<void>;
  verifyEmail(token: string, options?: Options): Promise<void>;
  passwordUpdate(
    currentPassword: string,
    newPassword: string,
    options: Options,
  ): Promise<void>;
  passwordReset(
    token: string,
    password: string,
    options?: Options,
  ): Promise<void>;
  updateProfile(data: Partial<UserDTO>, currentUser: UserDTO): Promise<void>;
}

export { IAuthService };

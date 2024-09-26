import { Transaction } from 'sequelize';
import { UserDTO } from '../dtos/users.dto';

interface CurrentUser {
  id: string | null;
}

interface Options {
  currentUser?: CurrentUser;
  transaction?: Transaction;
}

interface Filter {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  provider?: string;
  emailVerificationTokenExpiresAtRange?: [Date, Date];
  passwordResetTokenExpiresAtRange?: [Date, Date];
  active?: boolean | string;
  disabled?: boolean;
  emailVerified?: boolean;
  app_role?: string;
  createdAtRange?: [Date, Date];
  limit?: number;
  page?: number;
  custom_permissions?: string;
  field?: string;
  sort?: 'asc' | 'desc';
}

interface CountOptions {
  countOnly?: boolean;
  transaction?: Transaction;
}

interface UserAutocompleteResult {
  id: string;
  label: string;
}

interface AuthData {
  email: string;
  firstName: string;
  authenticationUid: string;
  password: string;
}

interface IUsersDBApi {
  create(data: { data: UserDTO }, options?: Options): Promise<UserDTO>;
  bulkImport(data: UserDTO[], options?: Options): Promise<UserDTO[]>;
  update(id: string, data: UserDTO, options?: Options): Promise<UserDTO>;
  deleteByIds(ids: string[], options?: Options): Promise<UserDTO[]>;
  remove(id: string, options?: Options): Promise<UserDTO>;
  findBy(where: object, options?: Options): Promise<UserDTO | null>;
  findAll(
    filter: Filter,
    options?: CountOptions,
  ): Promise<{ rows: UserDTO[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit: number,
  ): Promise<UserAutocompleteResult[]>;
  createFromAuth(data: AuthData, options?: Options): Promise<UserDTO>;
  updatePassword(
    id: string,
    password: string,
    options?: Options,
  ): Promise<UserDTO>;
  generateEmailVerificationToken(
    email: string,
    options?: Options,
  ): Promise<string>;
  generatePasswordResetToken(email: string, options?: Options): Promise<string>;
  findByPasswordResetToken(
    token: string,
    options?: Options,
  ): Promise<UserDTO | null>;
  findByEmailVerificationToken(
    token: string,
    options?: Options,
  ): Promise<UserDTO | null>;
  markEmailVerified(id: string, options?: Options): Promise<boolean>;
  _generateToken(
    keyNames: [string, string],
    email: string,
    options?: Options,
  ): Promise<string>;
}

export { IUsersDBApi };

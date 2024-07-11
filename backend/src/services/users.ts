const Users = require('./users.js');
import { Service } from 'typedi';
import type { IUsersService } from './interfaces/IUsersService.interface';
@Service()
export default class UsersService extends Users implements IUsersService {}

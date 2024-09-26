const Users = require('./users.js');

import { Service } from 'typedi';
import type { IUsersDBApi } from './interfaces/IUsersDBApi.interface';

@Service()
export default class UsersDBApi extends Users implements IUsersDBApi {}

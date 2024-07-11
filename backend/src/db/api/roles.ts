const Roles = require('./roles.js');

import { Service } from 'typedi';
import type { IRolesDBApi } from './interfaces/IRolesDBApi.interface';
@Service()
export default class RolesDBApi extends Roles implements IRolesDBApi {}

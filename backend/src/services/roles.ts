const Roles = require('./roles.js');
import { Service } from 'typedi';
import type { IRolesService } from './interfaces/IRolesService.interfaces';
@Service()
export default class RolesService extends Roles implements IRolesService {}

const Permissions = require('./permissions.js');
import { Service } from 'typedi';
import type { IPermissionsService } from './interfaces/IPermissionsService.interface';
@Service()
export default class PermissionsService
  extends Permissions
  implements IPermissionsService {}

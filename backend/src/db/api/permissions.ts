const Permissions = require('./permissions.js');

import { Service } from 'typedi';
import type { IPermissionsDBApi } from './interfaces/IPermissionsDBApi.interface';
@Service()
export default class PermissionsDBApi
  extends Permissions
  implements IPermissionsDBApi {}

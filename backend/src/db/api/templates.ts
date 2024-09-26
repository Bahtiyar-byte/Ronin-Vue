const Templates = require('./templates.js');

import { Service } from 'typedi';
import type { ITemplatesDBApi } from './interfaces/ITemplatesDBApi.interface';
@Service()
export default class TemplatesDBApi
  extends Templates
  implements ITemplatesDBApi {}

const Templates = require('./templates.js');
import { Service } from 'typedi';
import type { ITemplatesService } from './interfaces/ITermplatesService.interface';
@Service()
export default class TemplatesService
  extends Templates
  implements ITemplatesService {}

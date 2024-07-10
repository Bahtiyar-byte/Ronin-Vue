const EstimateSections = require('./estimate_sections.js');
import { Service } from 'typedi';
import type { IEstimateSectionsService } from './interfaces/IEstimateSectionsService.interface';
@Service()
export default class EstimateSectionsServiceService
  extends EstimateSections
  implements IEstimateSectionsService {}

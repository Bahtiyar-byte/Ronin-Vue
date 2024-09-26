const EstimateSections = require('./estimate_sections.js');

import { Service } from 'typedi';
import { IEstimateSectionsDBApi } from './interfaces/IEstimateSectionsDBApi.interface';
@Service()
export default class EstimateSectionsDBApi
  extends EstimateSections
  implements IEstimateSectionsDBApi {}

const Estimates = require('./estimates.js');
import { Service } from 'typedi';
import type { IEstimatesService } from './interfaces/IEstimatesService.interface';
@Service()
export default class EstimatesService
  extends Estimates
  implements IEstimatesService {}

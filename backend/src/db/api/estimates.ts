const Estimates = require('./estimates.js');

import { Service } from 'typedi';
import { IEstimatesDBApi } from './interfaces/IEstimatesDBApi.interface';
@Service()
export default class EstimatesDBApi
  extends Estimates
  implements IEstimatesDBApi {}

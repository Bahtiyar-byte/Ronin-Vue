const Jobs = require('./jobs.js');

import { Service } from 'typedi';
import type { IJobsDBApi } from './interfaces/IJobsDBApi.interface';
@Service()
export default class JobsDBApi extends Jobs implements IJobsDBApi {}

const Filters = require('./filters.js');

import { Service } from 'typedi';
import { IFiltersDBApi } from './interfaces/IFiltersDBApi.interface';
@Service()
export default class FiltersDBApi extends Filters implements IFiltersDBApi {}

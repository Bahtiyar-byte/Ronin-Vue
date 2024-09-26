const Search = require('./search.js');
import { Service } from 'typedi';
import type { ISearchService } from './interfaces/ISearchService.interface';
@Service()
export default class SearchService extends Search implements ISearchService {}

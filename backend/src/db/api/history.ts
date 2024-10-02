const History = require('./images.js');

import { Service } from 'typedi';
import { IHistoryDBApi } from './interfaces/IHistoryDBApi.interface';
@Service()
export default class HistoryDBApi extends History implements IHistoryDBApi {}

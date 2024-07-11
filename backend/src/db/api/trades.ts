const Trades = require('./trades.js');

import { Service } from 'typedi';
import type { ITradesDBApi } from './interfaces/ITradesDBApi.interface';
@Service()
export default class TradesDBApi extends Trades implements ITradesDBApi {}

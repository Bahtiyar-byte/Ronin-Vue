const Trades = require('./trades.js');
import { Service } from 'typedi';
import type { ITradesService } from './interfaces/ITradesService.interface';
@Service()
export default class TradesService extends Trades implements ITradesService {}

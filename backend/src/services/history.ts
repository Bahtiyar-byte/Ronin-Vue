const History = require('./history.js');
import { Service } from 'typedi';
import type { IHistoryService } from './interfaces/IHistoryService.interface';
@Service()
export default class HistoryService
    extends History
    implements IHistoryService {}

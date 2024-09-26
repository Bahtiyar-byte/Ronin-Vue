const Orders = require('./orders.js');
import { Service } from 'typedi';
import type { IOrdersService } from './interfaces/IOrdersService.interface';
@Service()
export default class OrderService extends Orders implements IOrdersService {}

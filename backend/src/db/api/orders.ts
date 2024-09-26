const Orders = require('./orders.js');

import { Service } from 'typedi';
import type { IOrdersDBApi } from './interfaces/IOrdersDBApi.interface';
@Service()
export default class OrdersDBApi extends Orders implements IOrdersDBApi {}

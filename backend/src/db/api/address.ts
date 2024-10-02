const Address = require('./Address.js');

import { Service } from 'typedi';
import { IAddressDBApi } from './interfaces/IAddressDBApi.interface';
@Service()
export default class AddressDBApi
    extends Address
    implements IAddressDBApi {}

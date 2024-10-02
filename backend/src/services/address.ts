const Address = require('./address.js');
import { Service } from 'typedi';
import type { IAddressService } from './interfaces/IAddressService.interface';
@Service()
export default class AddressService
    extends Address
    implements IAddressService {}

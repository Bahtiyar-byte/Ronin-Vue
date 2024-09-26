const Auth = require('./auth.js');
import { Service } from 'typedi';
import type { IAuthService } from './interfaces/IAuthService.interface';
@Service()
export default class AuthService extends Auth implements IAuthService {}

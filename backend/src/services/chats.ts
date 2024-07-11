const Chats = require('./chats.js');
import { Service } from 'typedi';
import type { IChatsService } from './interfaces/IChatsService.interface';
@Service()
export default class ChatsService extends Chats implements IChatsService {}

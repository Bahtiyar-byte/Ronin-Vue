const Chats = require('./chats.js');

import { Service } from 'typedi';
import { IChatsDBApi } from './interfaces/IChatDBApi.interface';
@Service()
export default class ChatDBApi extends Chats implements IChatsDBApi {}

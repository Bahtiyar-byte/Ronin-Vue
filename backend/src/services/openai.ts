const OpenAI = require('./openai.js');
import { Service } from 'typedi';
import type { IOpenAiService } from './interfaces/IOpenAiService.interface';
@Service()
export default class OpenAIService extends OpenAI implements IOpenAiService {}

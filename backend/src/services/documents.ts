const Documents = require('./documents.js');
import { Service } from 'typedi';
import type { IDocumentsService } from './interfaces/IDocumentsService.interface';
@Service()
export default class DocumentsService
  extends Documents
  implements IDocumentsService {}

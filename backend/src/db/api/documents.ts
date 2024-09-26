const Documents = require('./documents.js');

import { Service } from 'typedi';
import { IDocumentsDBApi } from './interfaces/IDocumentsDBApi.interface';
@Service()
export default class DocumentsDBApi
  extends Documents
  implements IDocumentsDBApi {}

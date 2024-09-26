const File = require('./file.js');

import { Service } from 'typedi';
import { IFileDBApi } from './interfaces/IFileDBApi.interface';
@Service()
export default class FileDBApi extends File implements IFileDBApi {}

const File = require('./file.js');
import { Service } from 'typedi';
import type { IFileManagerService } from './interfaces/IFileManagerService.interface';
@Service()
export default class FileService extends File implements IFileManagerService {}

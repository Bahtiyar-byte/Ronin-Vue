const Images = require('./images.js');
import { Service } from 'typedi';
import type { IImagesService } from './interfaces/IImagesService.interface';
@Service()
export default class ImageService extends Images implements IImagesService {}

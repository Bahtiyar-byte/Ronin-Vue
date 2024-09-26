const Images = require('./images.js');

import { Service } from 'typedi';
import { IImagesDBApi } from './interfaces/IImagesDBApi.interface';
@Service()
export default class ImagesDBApi extends Images implements IImagesDBApi {}

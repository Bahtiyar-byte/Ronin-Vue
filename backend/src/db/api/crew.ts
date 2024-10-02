const Crew = require('./crew.js');

import { Service } from 'typedi';
import { ICrewDBApi } from './interfaces/ICrewDBApi.interface';
@Service()
export default class CrewDBApi
    extends Crew
    implements ICrewDBApi {}

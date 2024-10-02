const Crew = require('./crew.js');
import { Service } from 'typedi';
import type { ICrewService } from './interfaces/ICrewService.interface';
@Service()
export default class CrewService
    extends Crew
    implements ICrewService {}

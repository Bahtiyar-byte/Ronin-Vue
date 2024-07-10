const Tasks = require('./tasks.js');
import { Service } from 'typedi';
import type { ITasksService } from './interfaces/ITasksServices.interface';
@Service()
export default class TasksService extends Tasks implements ITasksService {}

const Tasks = require('./tasks.js');

import { Service } from 'typedi';
import type { ITasksDBApi } from './interfaces/ITasksDBApi.interface';
@Service()
export default class TasksDBApi extends Tasks implements ITasksDBApi {}

const Appointments = require('./appointments.js');
import { Service } from 'typedi';
import type { IAppointmentsService } from './interfaces/IAppointmentsService.interface';
@Service()
export default class AppointmentsService
  extends Appointments
  implements IAppointmentsService {}

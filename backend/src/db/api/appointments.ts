const Appointments = require('./appointments.js');

import { Service } from 'typedi';
import { IAppointmentsDBApi } from './interfaces/IAppointmentsDBApi.interface';
@Service()
export default class AppointmentsDBApi
  extends Appointments
  implements IAppointmentsDBApi {}

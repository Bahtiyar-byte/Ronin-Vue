import { AppointmentDto } from '../../db/api/dtos/appointment.dto';
import { UserDTO } from '../../db/api/dtos/users.dto';

interface Request {
  file: {
    buffer: Buffer;
  };
  currentUser: UserDTO;
}

interface IAppointmentsService {
  create(data: AppointmentDto, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: Request,
    res: Response,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(
    data: AppointmentDto,
    id: string,
    currentUser: UserDTO,
  ): Promise<AppointmentDto>;
  deleteByIds(ids: string[], currentUser: UserDTO): Promise<void>;
  remove(id: string, currentUser: UserDTO): Promise<void>;
}
export { IAppointmentsService };

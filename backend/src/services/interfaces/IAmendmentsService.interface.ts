import { AmendmentDTO } from '../../db/api/dtos/amendment.dto';
import { UserDTO } from '../../db/api/dtos/users.dto';

interface Request {
  file: {
    buffer: Buffer;
  };
  currentUser: UserDTO;
}

interface IAmendmentsService {
  create(data: AmendmentDTO, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: Request,
    res: Response,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(
    data: AmendmentDTO,
    id: string,
    currentUser: UserDTO,
  ): Promise<AmendmentDTO>;
  deleteByIds(ids: string[], currentUser: UserDTO): Promise<void>;
  remove(id: string, currentUser: UserDTO): Promise<void>;
}

export { IAmendmentsService };

import { UserDTO } from '../../db/api/dtos/users.dto';
interface ImageData {
  name: string;
  description: string;
}

interface IImagesService {
  create(data: ImageData, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails: boolean,
    host: string,
  ): Promise<void>;
  update(
    data: Partial<ImageData>,
    id: string,
    currentUser: UserDTO,
  ): Promise<any>;
  deleteByIds(ids: string[], currentUser: UserDTO): Promise<void>;
  remove(id: string, currentUser: UserDTO): Promise<void>;
}

export { IImagesService };

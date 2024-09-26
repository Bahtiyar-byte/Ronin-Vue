import { Storage } from '@google-cloud/storage';
import { Request, Response } from 'express';
import { UserDTO } from '../../db/api/dtos/users.dto';

interface CustomRequest extends Request {
  currentUser: UserDTO;
  file: {
    buffer: Buffer;
  };
  body: {
    filename: string;
  };
}

interface CustomResponse extends Response {}

interface Validations {
  entity?: any;
  maxFileSize?: number;
  folderIncludesAuthenticationUid?: boolean;
}

interface IFileManagerService {
  ensureDirectoryExistence(filePath: string): boolean;
  uploadLocal(
    folder: string,
    validations?: Validations,
  ): (req: CustomRequest, res: CustomResponse) => void;
  downloadLocal(req: CustomRequest, res: CustomResponse): Promise<void>;
  initGCloud(): {
    hash: string;
    bucket: Storage;
    processFile: (req: CustomRequest, res: CustomResponse) => Promise<void>;
  };
  uploadGCloud(
    folder: string,
    req: CustomRequest,
    res: CustomResponse,
  ): Promise<void>;
  downloadGCloud(req: CustomRequest, res: CustomResponse): Promise<void>;
  deleteGCloud(privateUrl: string): Promise<void>;
}
export { IFileManagerService };

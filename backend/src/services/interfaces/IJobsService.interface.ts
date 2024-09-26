interface User {
  id: string;
  email: string;
  [key: string]: any;
}

interface JobData {
  title: string;
  description: string;
  [key: string]: any;
}

export interface IJobsService {
  create(data: JobData, currentUser: User): Promise<void>;
  bulkImport(
    req: Request,
    res: Response,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: JobData, id: string, currentUser: User): Promise<JobData>;
  deleteByIds(ids: string[], currentUser: User): Promise<void>;
  remove(id: string, currentUser: User): Promise<void>;
}

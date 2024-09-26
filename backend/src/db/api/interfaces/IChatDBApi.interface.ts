import { Transaction } from 'sequelize';
import { ChatDTO } from '../dtos/chat.dto';
import { UserDTO } from '../dtos/users.dto';

interface CreateChatData {
  id?: string;
  name?: string;
  importHash?: string;
  related_job?: string;
  related_users?: string[];
}

interface UpdateChatData {
  name?: string;
  related_job?: string;
  related_users?: string[];
}

interface ChatFilter {
  limit?: number;
  page?: number;
  id?: string;
  name?: string;
  active?: boolean | string;
  related_job?: string;
  related_users?: string;
  createdAtRange?: [Date, Date];
  field?: string;
  sort?: string;
}

interface FindAllResult {
  rows: ChatDTO[];
  count: number;
}

interface FindAllAutocompleteResult {
  id: string;
  label: string;
}

interface Options {
  currentUser?: UserDTO;
  transaction?: Transaction;
  countOnly?: boolean;
}

export interface IChatsDBApi {
  create(data: CreateChatData, options?: Options): Promise<ChatDTO>;
  bulkImport(data: CreateChatData[], options?: Options): Promise<ChatDTO[]>;
  update(id: string, data: UpdateChatData, options?: Options): Promise<ChatDTO>;
  deleteByIds(ids: string[], options?: Options): Promise<ChatDTO[]>;
  remove(id: string, options?: Options): Promise<ChatDTO>;
  findBy(where: Partial<ChatDTO>, options?: Options): Promise<ChatDTO | null>;
  findAll(filter: ChatFilter, options?: Options): Promise<FindAllResult>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<FindAllAutocompleteResult[]>;
}

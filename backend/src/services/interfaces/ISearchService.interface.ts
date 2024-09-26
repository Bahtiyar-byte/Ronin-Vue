import { UserDTO } from '../../db/api/dtos/users.dto';

interface ISearchService {
  search(searchQuery: string, currentUser: UserDTO): Promise<any[]>;
}
export { ISearchService };

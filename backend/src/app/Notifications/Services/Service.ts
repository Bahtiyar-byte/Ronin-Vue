import type Contact from '~/@types/Contact/Contact';
import type User from '~/@types/User/User';
import type {
  NotificationKey,
  NotificationType,
} from '../../../@types/Notification/NotificationTypes';
import ContactsDBApi  from '../../../db/api/contacts';
import UsersDBApi from '../../../db/api/users';

export namespace NotificationsServices {
  export abstract class Service {
    private usersDbApi: UsersDBApi;


    protected constructor() {
      this.usersDbApi = new UsersDBApi();
    }

    checkIfNotificationEnabled(
      user: User,
      type: NotificationType,
      key: NotificationKey,
    ): boolean {
      return true;
    }

    protected async getUser(id: string): Promise<User> {
      return UsersDBApi.findBy({ id });
    }

    protected async getContact(id: string): Promise<Contact> {
      return ContactsDBApi.findBy({ id });
    }
  }
}

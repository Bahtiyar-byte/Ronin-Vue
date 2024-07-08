import type Contact from '~/@types/Contact/Contact';
import type User from '~/@types/User/User';
import type {
  NotificationKey,
  NotificationType,
} from '../../../@types/Notification/NotificationTypes';

export namespace NotificationsServices {
  export abstract class Service {
    private usersDbApi;

    private contactsDbApi;

    protected constructor() {
      this.usersDbApi = require('../../../db/api/users.js');
      this.contactsDbApi = require('../../../db/api/contacts');
    }

    checkIfNotificationEnabled(
      user: User,
      type: NotificationType,
      key: NotificationKey,
    ): boolean {
      return true;
    }

    protected async getUser(id: string): Promise<User> {
      return this.usersDbApi.findBy({ id });
    }

    protected async getContact(id: string): Promise<Contact> {
      return this.contactsDbApi.findBy({ id });
    }
  }
}

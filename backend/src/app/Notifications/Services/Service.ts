
import type User from '~/@types/User/User'
import type { NotificationType, NotificationKey } from '../../../@types/Notification/NotificationTypes'

export namespace NotificationsServices {
    export abstract class Service {
        private usersDbApi

        protected constructor() {
            this.usersDbApi = require('../../../db/api/users.js');
        }

        checkIfNotificationEnabled(user: User, type: NotificationType, key: NotificationKey): boolean {
            return true
        }

        protected async getUser(id: string): Promise<User> {
            return this.usersDbApi.findBy({ id })
        }
    }
}

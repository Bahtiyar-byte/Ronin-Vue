
import type User from '~/@types/User/User'
import type { NotificationType, NotificationKey } from '../../../@types/Notification/NotificationTypes'

export namespace NotificationsServices {
    export abstract class Service {
        checkIfNotificationEnabled(user: User, type: NotificationType, key: NotificationKey): boolean {
            return true
        }
    }
}

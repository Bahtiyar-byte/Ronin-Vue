import type StandardEntity from "../../../@types/StandardEntity";

export namespace NotificationsServicesInterfaces {
    export interface EntityCreationNotifier {
        notifyCreated(entity: StandardEntity): Promise<boolean>
    }
}

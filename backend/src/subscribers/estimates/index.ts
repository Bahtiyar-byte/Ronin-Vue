import { Container } from 'typedi'
import type Estimate from '~/@types/Estimate/Estimate'

import {
    NotificationServiceToken,
} from '../../app/Notifications/Services/Estimates/NotificationsServicesEstimates';

const eventEmitter = require('../../utils/eventEmitter');

const notificationService = Container.get(NotificationServiceToken);

eventEmitter.on('estimateCreated', async (estimate: Estimate) => {
    await notificationService.notifyCreated(estimate)
});

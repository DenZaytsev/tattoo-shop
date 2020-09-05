import { Toast } from '@geist-ui/react';
import { root } from './root';

export const notify = root.createEvent('notification');
export const $currentNotification = root.createStore<Toast | null>(null);

$currentNotification.on(notify, (_, toast: Toast) => toast);

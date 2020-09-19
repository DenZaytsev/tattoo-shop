import type { Toast } from '@geist-ui/react/dist/use-toasts/use-toast';

import { root } from './root';

export const notify = root.createEvent<Toast>('notification');
export const $currentNotification = root.createStore<Toast | null>(null);

$currentNotification.on(notify, (_, toast: Toast) => toast);

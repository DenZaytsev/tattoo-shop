import { createDomain } from 'effector';
import { attachLogger } from 'effector-logger/attach';

export const root = createDomain('root');

if (process.env.NODE_ENV === 'development') {
  attachLogger(root);
}

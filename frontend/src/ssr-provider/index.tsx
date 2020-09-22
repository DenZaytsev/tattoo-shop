import React from 'react';
import { Provider as SSRStateEffectorProvider } from 'effector-react/ssr';
import { fork } from 'effector/fork';

import { root } from '../core/root';

interface EffectorSSRProps {
  serverValues: any;
}

export const EffectorSSR: React.FC<EffectorSSRProps> = ({
  serverValues,
  children,
}) => {
  const scope = fork(root, { values: serverValues });

  return (
    <SSRStateEffectorProvider value={scope}>
      {children}
    </SSRStateEffectorProvider>
  );
};

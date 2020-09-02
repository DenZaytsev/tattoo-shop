import React from 'react';
import { styled } from 'linaria/react';

type Side = 'left' | 'right';

interface SideContainerProps {
  open: boolean;
  side: Side;
}

interface WrapperProps {
  side: Side;
}

const SideContainerContent: React.FC<WrapperProps> = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  & > * {
    align-self: ${({ side }) => (side === 'left' ? 'flex-start' : 'flex-end')};
  }
`;

export const SideContainer: React.FC<SideContainerProps> = React.memo(
  ({ open = false, side = 'right', className, children }) => {
    return (
      <SideContainerContent className={className} side={side}>
        {open && children}
      </SideContainerContent>
    );
  },
);

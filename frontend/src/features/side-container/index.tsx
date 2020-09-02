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
  transition: 0.55s ease-in;
  transition-property: transform, opacity;

  & > * {
    align-self: ${({ side }) => (side === 'left' ? 'flex-start' : 'flex-end')};
    opacity: ${({ open }) => (open ? '1' : '0')};
  }
`;

export const SideContainer: React.FC<SideContainerProps> = React.memo(
  ({ open = false, side = 'right', className, children }) => {
    return (
      <SideContainerContent className={className} side={side} open={open}>
        {children}
      </SideContainerContent>
    );
  },
);

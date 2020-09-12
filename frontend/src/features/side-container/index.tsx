import React from 'react';
import { styled } from 'linaria/react';

type Side = 'left' | 'right';

interface SideContainerProps {
  open: boolean;
  side: Side;
  className?: string;
}

const SideContainerContent: React.FC<SideContainerProps> = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  & > * {
    transition: transform 0.6s ease-in, opacity 0.4s ease;
    align-self: ${({ side }) => (side === 'left' ? 'flex-start' : 'flex-end')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    transform: ${({ open, side }) => {
      if (open) return 'translateX(0)';

      return side === 'left' ? 'translateX(300px)' : 'translateX(-300px)';
    }};
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

SideContainer.displayName = 'SideContainer';

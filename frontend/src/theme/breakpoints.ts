import { GeistUIThemesBreakpoints } from '@geist-ui/react';

export const desktopBp = 900;
export const desktopBpPx = `${desktopBp}px`;
export const contentMaxWidth = 600;

export const customBreakpoints: GeistUIThemesBreakpoints = {
  xs: { min: '0', max: '650px' },
  sm: { min: '650px', max: '900px' },
  md: { min: '900px', max: '1280px' },
  lg: { min: '1280px', max: '1920px' },
  xl: { min: '1920px', max: '10000px' },
  mobile: { min: '0', max: `${desktopBp}px` },
};

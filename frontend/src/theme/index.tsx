import React from 'react';
import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';
import {
  GeistProvider,
  useTheme,
  GeistUIThemes,
  GeistUIThemesPalette,
} from '@geist-ui/react';

import { customBreakpoints } from './breakpoints';

const customTheme: Partial<GeistUIThemes> = {
  breakpoints: customBreakpoints,
};

export const toggleThemeMode = createEvent();

const $currentThemeMode = createStore<'light' | 'dark'>('light');

$currentThemeMode.on(toggleThemeMode, (mode) => {
  if (mode === 'light') return 'dark';

  return 'light';
});

const toCssCustomProp = (prop: string) => `--${prop}`;
const themeToCustomProps = (
  themeObj: Partial<GeistUIThemes> | Partial<GeistUIThemesPalette>,
): React.CSSProperties => {
  const CustomProps = {};

  for (const prop in themeObj) {
    if (Object.prototype.hasOwnProperty.call(themeObj, prop)) {
      CustomProps[toCssCustomProp(prop)] = themeObj[prop];
    }
  }

  return CustomProps;
};

export const GeistProviderWithSwitch: React.FC = ({ children }) => {
  const currentMode = useStore($currentThemeMode);

  const currentThemeOverrides = {
    type: currentMode,
    ...customTheme,
  };

  const { palette } = useTheme();
  const styleWithProps = React.useMemo(() => themeToCustomProps(palette), [
    currentMode,
  ]);

  return (
    <GeistProvider theme={currentThemeOverrides}>
      <div style={styleWithProps}>{children}</div>
    </GeistProvider>
  );
};

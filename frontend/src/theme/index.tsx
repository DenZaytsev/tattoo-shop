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

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P];
};

const customTheme: DeepPartial<GeistUIThemes> = {
  breakpoints: customBreakpoints,
  expressiveness: {
    shadowMedium: '0 12px 30px rgba(0, 0, 0, 0.18)',
  },
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
      <div id="geistProvider" style={styleWithProps}>
        {children}
      </div>
    </GeistProvider>
  );
};

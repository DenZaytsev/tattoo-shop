import React from 'react';
import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';
import { GeistProvider, GeistUIThemes } from '@geist-ui/react';

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

export const GeistProviderWithSwitch: React.FC = ({ children }) => {
  const currentMode = useStore($currentThemeMode);

  const currentThemeOverrides = {
    type: currentMode,
    ...customTheme,
  };

  return (
    <GeistProvider theme={currentThemeOverrides}>{children}</GeistProvider>
  );
};

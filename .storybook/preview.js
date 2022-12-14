import { addDecorator } from '@storybook/react';
import withProviders from './withProviders';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

//use our providers in SB
addDecorator(withProviders);

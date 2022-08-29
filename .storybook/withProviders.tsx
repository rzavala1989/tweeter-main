import React from 'react';
import GlobalStyles from '../src/styles/GlobalStyles';
import { AuthProvider } from '../src/contexts/AuthContext';
import { ThemeContextProvider } from '../src/contexts/Theme';
import { AnimatePresence } from 'framer-motion';

const withProviders = (story) => (
  <>
    <AuthProvider>
      <ThemeContextProvider>
        <AnimatePresence exitBeforeEnter>
          {story()}
          <GlobalStyles />
        </AnimatePresence>
      </ThemeContextProvider>
    </AuthProvider>
  </>
);

export default withProviders;

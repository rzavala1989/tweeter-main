import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeContextProvider } from '../contexts/Theme';
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

import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeContextProvider } from '../contexts/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

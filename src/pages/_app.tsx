import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../next-seo.config';
import Header from 'src/components/Header';
import ScrollToTop from 'src/components/ScrollToTop';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeContextProvider } from '../contexts/Theme';
import GlobalStyles from 'src/styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <>
      <DefaultSeo {...SEO} />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        transition={Zoom}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
        theme='light'
      />
      <NextNProgress color='#2F8000' startPosition={0.5} />
      <AuthProvider>
        <ThemeContextProvider>
          {asPath === '/' || '/signup' ? (
            <>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </>
          ) : (
            <>
              <Header />
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
              <ScrollToTop />
              <GlobalStyles />
            </>
          )}
        </ThemeContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

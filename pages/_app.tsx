import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeContextProvider } from '../contexts/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@material-ui/core';
import TabNavigationBar from '../components/TabNavigationBar';
import ViewPortContainer from '../components/ViewPortContainer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { categories } from './statistics/[category]';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Fictional vaccine statistics." />
      </Head>
      <CssBaseline />
      <ViewPortContainer>
        <TabNavigationBar tabs={[...categories]} />
        <Component {...pageProps} key={router.asPath} />
      </ViewPortContainer>
    </>
  );
}

export default CustomApp;

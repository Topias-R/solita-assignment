import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@material-ui/core';
import { TabNavigationBar } from '../components/TabNavigationBar';
import { ViewPortContainer } from '../components/ViewPortContainer';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
        <TabNavigationBar
          pathname={router.asPath}
          tabs={[
            ['Arrived Total', '/statistics/arrived-total'],
            ['Arrived Per Producer', '/statistics/arrived-per-producer'],
            ['Bottles Expired', '/statistics/bottles-expired'],
            ['Injections Expired', '/statistics/injections-expired'],
            ['Injections Used', '/statistics/injections-used'],
            ['Injections Available', '/statistics/injections-available'],
            [
              'Injections Expiring in 10d',
              '/statistics/injections-expiring-in-10d'
            ]
          ]}
        />
        <Component {...pageProps} key={router.asPath} />
      </ViewPortContainer>
    </>
  );
}

export default CustomApp;

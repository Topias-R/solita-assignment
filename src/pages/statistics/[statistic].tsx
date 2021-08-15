import React from 'react';
import useSWR from 'swr';
import superjson from 'superjson';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  DateLineChart,
  DateLineChartProps
} from '../../components/DateLineChart';
import Head from 'next/head';
import { getArrivedTotal } from '../../queries/arrivedTotal';
import { getArrivedPerProducer } from '../../queries/arrivedPerProducer';
import { getBottlesExpired } from '../../queries/bottlesExpired';
import { getInjectionsAvailable } from '../../queries/injectionsAvailable';
import { getInjectionsExpired } from '../../queries/injectionsExpired';
import { getInjectionsExpiringIn10d } from '../../queries/injectionsExpiringIn10d';
import { getInjectionsUsed } from '../../queries/injectionsUsed';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressContainer: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  })
);

interface StatisticProps {
  title: string;
  api: string;
  data: DateLineChartProps['data'];
}

export default function Statistics({
  title,
  api,
  data
}: StatisticProps): JSX.Element {
  const classes = useStyles();
  const { isFallback } = useRouter();

  const { data: swrData } = useSWR<DateLineChartProps['data']>(
    api,
    () =>
      fetch(api)
        .then((res) => res.text())
        .then((text) => superjson.parse(text)),
    { initialData: data, refreshInterval: 60 }
  );

  if (isFallback) {
    return (
      <div className={classes.progressContainer}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title} Statistics</title>
      </Head>
      <DateLineChart
        margin={{ top: 34, right: 34, bottom: 51, left: -17 }}
        strokes={[
          'navy',
          'red',
          'purple',
          'blue',
          'fuchsia',
          'darkorange',
          'green',
          'maroon'
        ]}
        data={swrData || data}
      ></DateLineChart>
    </>
  );
}

export const pages = [
  'arrived-per-producer',
  'arrived-total',
  'bottles-expired',
  'injections-available',
  'injections-expired',
  'injections-expiring-in-10d',
  'injections-used'
] as const;

export const getStaticPaths: GetStaticPaths = async () => {
  // Only prerender at build if we are exporting.
  const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === '1';
  return {
    paths: isExport
      ? [...pages].map((page) => ({ params: { statistic: page } }))
      : [],
    fallback: !isExport
  };
};

interface Params extends ParsedUrlQuery {
  statistic: typeof pages[number];
}

export const getStaticProps: GetStaticProps<StatisticProps, Params> = async ({
  params
}) => {
  const pageProps = {
    'arrived-per-producer': {
      title: 'Arrived Per Producer',
      dataGetter: getArrivedPerProducer
    },
    'arrived-total': {
      title: 'Arrived Total',
      dataGetter: getArrivedTotal
    },
    'bottles-expired': {
      title: 'Bottles Expired',
      dataGetter: getBottlesExpired
    },
    'injections-available': {
      title: 'Injections Available',
      dataGetter: getInjectionsAvailable
    },
    'injections-expired': {
      title: 'Injections Expired',
      dataGetter: getInjectionsExpired
    },
    'injections-expiring-in-10d': {
      title: 'Injections Expiring in 10D',
      dataGetter: getInjectionsExpiringIn10d
    },
    'injections-used': {
      title: 'Injections Used',
      dataGetter: getInjectionsUsed
    }
  };

  const page = params?.statistic;

  if (typeof page === 'string' && pages.includes(page)) {
    try {
      const title = pageProps[page].title;
      const api = `/api/statistics/${page}`;
      const data = await pageProps[page].dataGetter();

      return {
        props: {
          title,
          api,
          data
        },
        revalidate: 60
      };
    } catch (err) {
      console.error(err);
    }
  }

  return { notFound: true };
};

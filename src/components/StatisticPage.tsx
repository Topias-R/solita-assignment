import React from 'react';
import useSWR from 'swr';
import superjson from 'superjson';
import { GetStaticProps } from 'next';
import { DateLineChart, DateLineChartProps } from './DateLineChart';
import Head from 'next/head';

interface StatisticPageProps {
  title: string;
  api: string;
  data: DateLineChartProps['data'];
}

export function StatisticPage({
  title,
  api,
  data
}: StatisticPageProps): JSX.Element {
  const { data: swrData } = useSWR<DateLineChartProps['data']>(
    api,
    () =>
      fetch(api)
        .then((res) => res.text())
        .then((text) => superjson.parse(text)),
    { initialData: data, refreshInterval: 60 }
  );
  return (
    <>
      <Head>
        <title>{title} Statistics</title>
      </Head>
      <DateLineChart
        margin={{ top: 34, right: 34, bottom: 68, left: -17 }}
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

export function getStatisticPageStaticProps(
  title: string,
  api: string,
  dataGetter: () => Promise<StatisticPageProps['data']>
): typeof getStaticProps {
  const getStaticProps: GetStaticProps<StatisticPageProps> = async () => {
    const data = await dataGetter();

    return {
      props: {
        title,
        api,
        data
      },
      revalidate: 60
    };
  };

  return getStaticProps;
}

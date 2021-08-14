import React from 'react';
import { GetStaticProps } from 'next';
import { DateLineChart, DateLineChartProps } from './DateLineChart';
import Head from 'next/head';

interface StatisticPageProps {
  title: string;
  data: DateLineChartProps['data'];
}

export function StatisticPage({
  title,
  data
}: StatisticPageProps): JSX.Element {
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
        data={data}
      ></DateLineChart>
    </>
  );
}

export function getStatisticPageStaticProps(
  title: string,
  dataGetter: () => Promise<StatisticPageProps['data']>
): typeof getStaticProps {
  const getStaticProps: GetStaticProps<StatisticPageProps> = async () => {
    const data = await dataGetter();

    return {
      props: {
        title,
        data
      },
      revalidate: 60
    };
  };

  return getStaticProps;
}
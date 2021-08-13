import React from 'react';
import { GetStaticProps } from 'next';
import { DateLineChart, DateLineChartProps } from './DateLineChart';
import Head from 'next/head';

interface StatisticProps {
  title: string;
  data: DateLineChartProps['data'];
}

export function Statistic({ title, data }: StatisticProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title} Statistics</title>
      </Head>
      <DateLineChart data={data}></DateLineChart>
    </>
  );
}

export function getStatisticStaticProps(
  title: string,
  dataGetter: () => Promise<StatisticProps['data']>
): typeof getStaticProps {
  const getStaticProps: GetStaticProps<StatisticProps> = async () => {
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

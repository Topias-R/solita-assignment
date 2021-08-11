import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import DateLineChart from '../../components/DateLineChart';
import { prettifyCamelCase } from '../../utils/prettifyCamelCase';
import { getArrivedPerProducer } from '../api/arrivedPerProducer';
import { getArrivedTotal } from '../api/arrivedTotal';
import { getBottlesExpired } from '../api/bottlesExpired';
import { getInjectionsExpired } from '../api/injectionsExpired';
import { getInjectionsUsed } from '../api/injectionsUsed';
import type { UnPromisify } from '../../utils/types/UnPromisify';
import { getInjectionsAvailable } from '../api/injectionsAvailable';

function Category({
  data
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();

  const { category } = router.query;

  return (
    <>
      <Head>
        <title>
          {typeof category === 'string' ? prettifyCamelCase(category) : ''}
          Statistics
        </title>
      </Head>
      <DateLineChart data={data}></DateLineChart>
    </>
  );
}

export default Category;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: categories.map((category) => ({
    params: { category }
  })),
  fallback: false
});

export const categories = [
  'arrivedTotal',
  'arrivedPerProducer',
  'bottlesExpired',
  'injectionsExpired',
  'injectionsUsed',
  'injectionsAvailable'
] as const;

type Categories = typeof categories[number];

interface Params extends ParsedUrlQuery {
  category: Categories;
}

interface Props<T> {
  data: T;
}

// Have to define return type in this manner or server side modules get bundled to browser.
export const getStaticProps = async ({
  params
}: GetStaticPropsContext<Params>): Promise<
  GetStaticPropsResult<
    Props<
      UnPromisify<
        ReturnType<typeof categoryGetters[keyof typeof categoryGetters]>
      >
    >
  >
> => {
  const categoryGetters = {
    arrivedTotal: getArrivedTotal,
    arrivedPerProducer: getArrivedPerProducer,
    bottlesExpired: getBottlesExpired,
    injectionsExpired: getInjectionsExpired,
    injectionsUsed: getInjectionsUsed,
    injectionsAvailable: getInjectionsAvailable
  };

  try {
    if (params?.category && categories.includes(params.category)) {
      const data = await categoryGetters[params.category]();

      return {
        props: {
          data
        },
        revalidate: 300
      };
    }
  } catch (err) {
    console.error(err);
  }
  return { notFound: true };
};

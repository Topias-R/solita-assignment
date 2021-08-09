import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import DateLineChart from '../../components/DateLineChart';
import { prettifyCamelCase } from '../../utils/prettifyCamelCase';
import {
  ArrivedPerProducer,
  getArrivedPerProducer
} from '../api/arrivedPerProducer';
import { ArrivedTotal, getArrivedTotal } from '../api/arrivedTotal';
import { BottlesExpired, getBottlesExpired } from '../api/bottlesExpired';
import {
  getInjectionsExpired,
  InjectionsExpired
} from '../api/injectionsExpired';
import { getInjectionsUsed, InjectionsUsed } from '../api/injectionsUsed';

export function Category({
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

const categories = {
  arrivedTotal: getArrivedTotal,
  arrivedPerProducer: getArrivedPerProducer,
  bottlesExpired: getBottlesExpired,
  injectionsExpired: getInjectionsExpired,
  injectionsUsed: getInjectionsUsed
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(categories).map((category) => ({ params: { category } })),
  fallback: false
});

interface Props {
  data:
    | ArrivedTotal[]
    | ArrivedPerProducer[]
    | BottlesExpired[]
    | InjectionsExpired[]
    | InjectionsUsed[];
}

interface Params extends ParsedUrlQuery {
  category: keyof typeof categories;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  try {
    if (params?.category && Object.keys(categories).includes(params.category)) {
      const data = await categories[params.category]();

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

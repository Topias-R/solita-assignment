import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { ArrivedTotal, getArrivedTotal } from './api/arrivedTotal';

export function Index({
  data
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const transformedData = data.map((curr) => ({
    ...curr,
    date: curr.date.toLocaleDateString(undefined, {
      month: '2-digit',
      day: '2-digit'
    })
  }));
  return (
    <div className="container">
      <Head>
        <title>Vaccine Statistics</title>
      </Head>

      <main style={{ height: '90vh', width: '90vw' }}>
        <ResponsiveContainer>
          <LineChart data={transformedData}>
            <Line type="monotone" dataKey="totalOrders" stroke="blue" />
            <Line type="monotone" dataKey="totalDoses" stroke="red" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
}

export default Index;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ data: ArrivedTotal[] }>
> {
  const data = await getArrivedTotal();

  return {
    props: {
      data
    },
    revalidate: 300
  };
}

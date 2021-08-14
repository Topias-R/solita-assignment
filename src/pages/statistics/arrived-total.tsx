import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getArrivedTotal } from '../../queries/arrivedTotal';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Arrived Total',
  getArrivedTotal
);

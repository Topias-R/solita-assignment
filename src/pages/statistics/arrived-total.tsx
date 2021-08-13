import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getArrivedTotal } from '../../queries/arrivedTotal';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Arrived Total',
  getArrivedTotal
);

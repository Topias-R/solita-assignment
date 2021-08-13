import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getInjectionsAvailable } from '../../queries/injectionsAvailable';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Injections Expired',
  getInjectionsAvailable
);

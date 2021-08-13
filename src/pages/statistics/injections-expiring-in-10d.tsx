import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getInjectionsExpiringIn10d } from '../../queries//injectionsExpiringIn10d';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Injections Expiring in 10D',
  getInjectionsExpiringIn10d
);

import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getInjectionsExpired } from '../../queries//injectionsExpired';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Injections Expired',
  getInjectionsExpired
);

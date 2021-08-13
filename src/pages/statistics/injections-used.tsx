import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getInjectionsUsed } from '../../queries//injectionsUsed';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Injections Used',
  getInjectionsUsed
);

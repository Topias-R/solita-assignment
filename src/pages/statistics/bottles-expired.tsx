import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getBottlesExpired } from '../../queries/bottlesExpired';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Bottles Expired',
  getBottlesExpired
);

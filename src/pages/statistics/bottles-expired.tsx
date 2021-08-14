import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getBottlesExpired } from '../../queries/bottlesExpired';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Bottles Expired',
  getBottlesExpired
);

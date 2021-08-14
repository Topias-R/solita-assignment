import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getInjectionsExpiringIn10d } from '../../queries//injectionsExpiringIn10d';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Injections Expiring in 10D',
  '/api/statistics/injections-expiring-in-10d',
  getInjectionsExpiringIn10d
);

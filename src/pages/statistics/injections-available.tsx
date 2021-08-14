import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getInjectionsAvailable } from '../../queries/injectionsAvailable';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Injections Expired',
  '/api/statistics/injections-available',
  getInjectionsAvailable
);

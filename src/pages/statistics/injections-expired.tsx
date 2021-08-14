import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getInjectionsExpired } from '../../queries//injectionsExpired';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Injections Expired',
  getInjectionsExpired
);

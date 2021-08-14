import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getInjectionsUsed } from '../../queries//injectionsUsed';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Injections Used',
  getInjectionsUsed
);

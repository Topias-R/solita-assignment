import { StatisticPage } from '../../components/StatisticPage';
import { getStatisticPageStaticProps } from '../../components/StatisticPage';
import { getArrivedPerProducer } from '../../queries/arrivedPerProducer';

export default StatisticPage;

export const getStaticProps = getStatisticPageStaticProps(
  'Arrived Per Producer',
  getArrivedPerProducer
);

import { Statistic } from '../../components/Statistic';
import { getStatisticStaticProps } from '../../components/Statistic';
import { getArrivedPerProducer } from '../../queries/arrivedPerProducer';

export default Statistic;

export const getStaticProps = getStatisticStaticProps(
  'Arrived Per Producer',
  getArrivedPerProducer
);

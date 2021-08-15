import { NextApiRequest, NextApiResponse } from 'next';
import { DateLineChartProps } from '../../../components/DateLineChart';
import { getArrivedPerProducer } from '../../../queries/arrivedPerProducer';
import { getArrivedTotal } from '../../../queries/arrivedTotal';
import { getBottlesExpired } from '../../../queries/bottlesExpired';
import { getInjectionsAvailable } from '../../../queries/injectionsAvailable';
import { getInjectionsExpired } from '../../../queries/injectionsExpired';
import { getInjectionsExpiringIn10d } from '../../../queries/injectionsExpiringIn10d';
import { getInjectionsUsed } from '../../../queries/injectionsUsed';
import { cacheJson } from '../../../utils/cacheJson';
import { pages } from '../../statistics/[statistic]';

const dataGetters: {
  [key: string]: () => Promise<DateLineChartProps['data']>;
} = {
  'arrived-per-producer': getArrivedPerProducer,
  'arrived-total': getArrivedTotal,
  'bottles-expired': getBottlesExpired,
  'injections-available': getInjectionsAvailable,
  'injections-expired': getInjectionsExpired,
  'injections-expiring-in-10d': getInjectionsExpiringIn10d,
  'injections-used': getInjectionsUsed
};

interface NextApiRequestWithQuery extends NextApiRequest {
  query: {
    statistic: typeof pages[number];
  };
}

export default async function (
  req: NextApiRequestWithQuery,
  res: NextApiResponse
): Promise<void> {
  const { statistic } = req.query;

  if (typeof statistic === 'string' && pages.includes(statistic)) {
    return res
      .status(200)
      .json(await cacheJson(statistic, dataGetters[statistic]));
  }

  return res.status(404).send('Not Found');
}

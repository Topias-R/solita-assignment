import { NextApiHandler } from 'next';
import { getArrivedPerProducer } from '../../../queries/arrivedPerProducer';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res
    .status(200)
    .json(await cacheJson('arrivedPerProducer', getArrivedPerProducer));

export default handler;

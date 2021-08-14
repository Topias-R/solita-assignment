import { NextApiHandler } from 'next';
import { getInjectionsExpiringIn10d } from '../../../queries/injectionsExpiringIn10d';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res
    .status(200)
    .json(
      await cacheJson('getInjectionsExpiringIn10d', getInjectionsExpiringIn10d)
    );

export default handler;

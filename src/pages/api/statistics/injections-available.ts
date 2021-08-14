import { NextApiHandler } from 'next';
import { getInjectionsAvailable } from '../../../queries/injectionsAvailable';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res
    .status(200)
    .json(await cacheJson('getInjectionsAvailable', getInjectionsAvailable));

export default handler;

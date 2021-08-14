import { NextApiHandler } from 'next';
import { getInjectionsExpired } from '../../../queries/injectionsExpired';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res
    .status(200)
    .json(await cacheJson('getInjectionsExpired', getInjectionsExpired));

export default handler;

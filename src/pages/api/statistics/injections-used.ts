import { NextApiHandler } from 'next';
import { getInjectionsUsed } from '../../../queries/injectionsUsed';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await cacheJson('getInjectionsUsed', getInjectionsUsed));

export default handler;

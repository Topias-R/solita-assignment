import { NextApiHandler } from 'next';
import { getBottlesExpired } from '../../../queries/bottlesExpired';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await cacheJson('getBottlesExpired', getBottlesExpired));

export default handler;

import { NextApiHandler } from 'next';
import { getArrivedTotal } from '../../../queries/arrivedTotal';
import { cacheJson } from '../../../utils/cacheJson';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await cacheJson('getArrivedTotal', getArrivedTotal));

export default handler;

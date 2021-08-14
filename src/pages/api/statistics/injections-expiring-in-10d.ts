import { NextApiHandler } from 'next';
import { getInjectionsExpiringIn10d } from '../../../queries/injectionsExpiringIn10d';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getInjectionsExpiringIn10d());

export default handler;

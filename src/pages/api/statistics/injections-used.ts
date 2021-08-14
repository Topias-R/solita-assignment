import { NextApiHandler } from 'next';
import { getInjectionsUsed } from '../../../queries/injectionsUsed';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getInjectionsUsed());

export default handler;

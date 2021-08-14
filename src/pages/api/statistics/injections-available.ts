import { NextApiHandler } from 'next';
import { getInjectionsAvailable } from '../../../queries/injectionsAvailable';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getInjectionsAvailable());

export default handler;

import { NextApiHandler } from 'next';
import { getInjectionsExpired } from '../../../queries/injectionsExpired';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getInjectionsExpired());

export default handler;

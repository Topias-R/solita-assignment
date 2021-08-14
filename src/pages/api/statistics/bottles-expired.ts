import { NextApiHandler } from 'next';
import { getBottlesExpired } from '../../../queries/bottlesExpired';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getBottlesExpired());

export default handler;

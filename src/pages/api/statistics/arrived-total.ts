import { NextApiHandler } from 'next';
import { getArrivedTotal } from '../../../queries/arrivedTotal';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getArrivedTotal());

export default handler;

import { NextApiHandler } from 'next';
import { getArrivedPerProducer } from '../../../queries/arrivedPerProducer';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(await getArrivedPerProducer());

export default handler;

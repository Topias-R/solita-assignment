import { NextApiRequest, NextApiResponse } from 'next';
import { prepareDatabaseConnection } from '../../utils/prepareDatabaseConnection';

export interface ArrivedPerProducer {
  totalOrders: number;
  totalDoses: number;
  vaccine: string;
  date: Date;
}

export async function getArrivedPerProducer(): Promise<ArrivedPerProducer[]> {
  const connection = await prepareDatabaseConnection();
  return connection
    .createQueryBuilder('Order', 'order')
    .select('COUNT(*)', 'totalOrders')
    .addSelect('SUM(injections)', 'totalDoses')
    .addSelect('arrived::DATE', 'date')
    .addSelect('vaccine')
    .groupBy('date')
    .addGroupBy('vaccine')
    .orderBy('date')
    .addOrderBy('vaccine')
    .getRawMany();
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getArrivedPerProducer());
}

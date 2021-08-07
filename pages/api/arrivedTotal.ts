import { NextApiRequest, NextApiResponse } from 'next';
import { prepareDatabaseConnection } from '../../utils/prepareDatabaseConnection';

export interface ArrivedTotal {
  totalOrders: number;
  totalDoses: number;
  date: Date;
}

export async function getArrivedTotal(): Promise<ArrivedTotal[]> {
  return (await prepareDatabaseConnection())
    .createQueryBuilder('Order', 'order')
    .select('COUNT(*)::INT', 'totalOrders')
    .addSelect('SUM(injections)::INT', 'totalDoses')
    .addSelect('arrived::DATE', 'date')
    .groupBy('date')
    .orderBy('date')
    .getRawMany();
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getArrivedTotal());
}

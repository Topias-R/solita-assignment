import { NextApiRequest, NextApiResponse } from 'next';
import { prepareDatabaseConnection } from '../../utils/prepareDatabaseConnection';

export interface BottlesExpired {
  bottlesExpired: number;
  date: Date;
}

export async function getBottlesExpired(): Promise<BottlesExpired[]> {
  const connection = await prepareDatabaseConnection();
  return connection
    .createQueryBuilder('Order', 'order')
    .select('COUNT(*)::INT', 'bottlesExpired')
    .addSelect('arrived::DATE + 30', 'date')
    .groupBy('date')
    .orderBy('date')
    .getRawMany();
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getBottlesExpired());
}

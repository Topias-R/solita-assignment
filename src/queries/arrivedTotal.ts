import { prepareDatabaseConnection } from '../utils/prepareDatabaseConnection';

type ArrivedTotal = {
  ordersArrived: number;
  injectionsArrived: number;
  date: Date;
};

export async function getArrivedTotal(): Promise<ArrivedTotal[]> {
  const connection = await prepareDatabaseConnection();
  return connection
    .createQueryBuilder('Order', 'order')
    .select('COUNT(*)::INT', 'ordersArrived')
    .addSelect('SUM(injections)::INT', 'injectionsArrived')
    .addSelect('arrived::DATE', 'date')
    .groupBy('date')
    .orderBy('date')
    .getRawMany();
}

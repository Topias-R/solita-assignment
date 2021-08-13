import { prepareDatabaseConnection } from '../utils/prepareDatabaseConnection';

type ArrivedPerProducer = {
  date: Date;
} & {
  [key: string]: number;
};

export async function getArrivedPerProducer(): Promise<ArrivedPerProducer[]> {
  const connection = await prepareDatabaseConnection();

  // Get distinct vaccines.
  const vaccines: Record<'vaccine', string>[] = await connection
    .createQueryBuilder('Order', 'order')
    .select('DISTINCT vaccine')
    .getRawMany();

  const query = connection
    .createQueryBuilder('Order', 'order')
    .select('arrived::DATE', 'date')
    .groupBy('date')
    .orderBy('date');

  // Sum orders and doses for distinct vaccines.
  vaccines.forEach(({ vaccine }, idx) =>
    query
      .addSelect(
        `SUM(CASE WHEN vaccine = :vaccine${idx} THEN 1 ELSE 0 END)::INT`,
        `${vaccine}OrdersArrived`
      )
      .addSelect(
        `SUM(CASE WHEN vaccine = :vaccine${idx} THEN injections ELSE 0 END)::INT`,
        `${vaccine}InjectionsArrived`
      )
      .setParameter(`vaccine${idx}`, vaccine)
  );

  return query.getRawMany();
}

import { NextApiRequest, NextApiResponse } from 'next';
import { prepareDatabaseConnection } from '../../utils/prepareDatabaseConnection';

export interface InjectionsExpired {
  injectionsExpired: number;
  date: Date;
}

export async function getInjectionsExpired(): Promise<InjectionsExpired[]> {
  const connection = await prepareDatabaseConnection();
  return connection.query(`
    SELECT 
      (SUM("order"."injections") - SUM("o"."injectionsUsed"))::INT AS "injectionsExpired",
      "arrived"::DATE + 30 AS "date"
    FROM "orders" "order"
    INNER JOIN LATERAL (
      SELECT COUNT(*) AS "injectionsUsed"
      FROM "vaccinations" "vaccination"
      WHERE "order"."id" = "vaccination"."sourceBottle"
    ) AS "o" ON true
    GROUP BY date
    ORDER BY date ASC
  `);
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getInjectionsExpired());
}

import { prepareDatabaseConnection } from '../utils/prepareDatabaseConnection';

type InjectionsExpired = {
  injectionsExpired: number;
  date: Date;
};

export async function getInjectionsExpired(): Promise<InjectionsExpired[]> {
  const connection = await prepareDatabaseConnection();
  const result = await connection.query(
    `
    SELECT 
      (SUM("order"."injections") - SUM("o"."injectionsUsed"))::INT AS "injectionsExpired",
      "arrived"::DATE + 30 AS "date"
    FROM "orders" "order"
    LEFT JOIN LATERAL (
      SELECT COUNT(*) AS "injectionsUsed"
      FROM "vaccinations" "vaccination"
      WHERE "order"."id" = "vaccination"."sourceBottle"
    ) AS "o" ON true
    GROUP BY date
    ORDER BY date ASC
  `
  );

  return result.slice(0, result.length - 30);
}

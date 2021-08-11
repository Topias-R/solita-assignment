import { NextApiRequest, NextApiResponse } from 'next';
import { prepareDatabaseConnection } from '../../utils/prepareDatabaseConnection';

type InjectionsExpiringIn10D = {
  injectionsExpiringIn10Days: number;
  date: Date;
};

export async function getInjectionsExpiringIn10D(): Promise<
  InjectionsExpiringIn10D[]
> {
  const connection = await prepareDatabaseConnection();
  // Not entirely sure if this returns the correct result.
  return connection.query(
    `
    SELECT
      "arrived"::DATE AS "date",
      (SUM("o"."injectionsExpiringWithDuplicates") / COUNT(*))::INT AS "injectionsExpiringIn10D"
    FROM "orders" "order"
    LEFT JOIN LATERAL (
      SELECT 
        COALESCE(SUM("o"."injections") - SUM("v"."injectionsUsed"), 0)::INT AS "injectionsExpiringWithDuplicates"
      FROM "orders" "o"
      LEFT JOIN LATERAL (
        SELECT 
          COUNT(*)::INT AS "injectionsUsed"
        FROM "vaccinations" "v"
        WHERE
          "order"."id" = "v"."sourceBottle"
          AND
          "order"."arrived"::DATE >= "v"."vaccinationDate"::DATE
      ) AS "v" ON true
      WHERE 
        "order"."arrived"::DATE < "o"."arrived"::DATE + 30
        AND 
        "order"."arrived"::DATE >= "o"."arrived"::DATE + 20
    ) AS "o" ON true
    GROUP BY date
    ORDER BY date ASC
  `
  );
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getInjectionsExpiringIn10D());
}

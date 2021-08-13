import { prepareDatabaseConnection } from '../utils/prepareDatabaseConnection';

type InjectionsUsed = {
  injectionsUsed: number;
  date: Date;
};

export async function getInjectionsUsed(): Promise<InjectionsUsed[]> {
  const connection = await prepareDatabaseConnection();
  return connection
    .createQueryBuilder('Vaccination', 'vaccination')
    .select('COUNT(*)::INT', 'injectionsUsed')
    .addSelect('"vaccinationDate"::DATE', 'date')
    .groupBy('date')
    .orderBy('date')
    .getRawMany();
}

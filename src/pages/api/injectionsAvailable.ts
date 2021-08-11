import { NextApiRequest, NextApiResponse } from 'next';
import { getArrivedTotal } from './arrivedTotal';
import { getInjectionsExpired } from './injectionsExpired';
import { getInjectionsUsed } from './injectionsUsed';

type InjectionsAvailable = {
  date: Date;
  injectionsAvailable: number;
};

export async function getInjectionsAvailable(): Promise<InjectionsAvailable[]> {
  const [injectionsArrived, injectionsUsed, injectionsExpired] =
    await Promise.all([
      getArrivedTotal(),
      getInjectionsUsed(),
      getInjectionsExpired()
    ]);

  // Get unique dates across different datasets.
  const dates = [
    ...new Set(
      [...injectionsArrived, ...injectionsUsed, ...injectionsExpired].map(
        ({ date }) => date.getTime()
      )
    )
  ]
    .sort((a, b) => a - b)
    .map((date) => new Date(date));

  // Combine data by date.
  const combinedData = dates.map((date) => ({
    date,
    injectionsArrived:
      injectionsArrived.find((obj) => obj.date.getTime() === date.getTime())
        ?.injectionsArrived ?? 0,
    injectionsUsed:
      injectionsUsed.find((obj) => obj.date.getTime() === date.getTime())
        ?.injectionsUsed ?? 0,
    injectionsExpired:
      injectionsExpired.find((obj) => obj.date.getTime() === date.getTime())
        ?.injectionsExpired ?? 0
  }));

  // Subtract used & expired injections from arrived ones for each date and accumulate over dates.
  const result = combinedData.reduce<InjectionsAvailable[]>(
    (data, obj) => [
      ...data,
      {
        date: obj.date,
        injectionsAvailable:
          (data[data.length - 1]?.injectionsAvailable ?? 0) +
          (obj.injectionsArrived - obj.injectionsUsed - obj.injectionsExpired)
      }
    ],
    []
  );

  return result;
}

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.status(200).json(await getInjectionsAvailable());
}

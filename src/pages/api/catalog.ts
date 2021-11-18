import type { NextApiRequest, NextApiResponse } from 'next';
import { DB_URL } from '../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resCatalog = await fetch(`${DB_URL}/catalog`);
  const catalog = await resCatalog.json();
  res.status(200).send({ catalog });
}

import { getClient, getUri } from './client';

export const getCartDiscounts = async () => {
  const client = getClient();
  const uri = getUri('cartDiscounts');

  const limit = 200;

  let totalResults = [];
  let offset = 0;

  const response = await client.execute({
    uri: `${uri}?offset=${offset}&limit=${limit}`,
    method: 'GET',
  });

  const { total } = response.body;

  totalResults = [...response.body.results];

  while (total > totalResults.length) {
    offset = offset + limit;

    const response = await client.execute({
      uri: `${uri}?offset=${offset}&limit=${limit}`,
      method: 'GET',
    });

    totalResults = [...totalResults, ...response.body.results];
  }

  return totalResults;
};

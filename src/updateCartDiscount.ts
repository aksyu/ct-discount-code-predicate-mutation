import { getClient, getUri } from './client';

const delay = (t) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export const updateCartDiscount = async (
  discounts,
  predicate: string
): Promise<void> => {
  const client = getClient();
  const uri = getUri('cartDiscounts');

  let done = 0;
  const errorsIds = [];

  predicate;

  if (discounts?.length) {
    for await (const d of discounts) {
      try {
        await client.execute({
          uri: `${uri}/${d.id}`,
          method: 'POST',
          body: {
            version: d.version,
            actions: [
              {
                action: 'changeTarget',
                target: {
                  type: 'lineItems',
                  predicate,
                },
              },
            ],
          },
        });

        console.log(`Discount code updated: ${d.id}`);
      } catch (err) {
        errorsIds.push(d.id);
        console.error(
          `Error  updating a discount code: ${d.id}`,
          err.body?.message
        );
      }
      done = done + 1;
      const percent = ((done * 100) / discounts.length).toFixed() + '%';
      console.log(`${percent} done`);
      await delay(500);
    }

    if (errorsIds.length) {
      console.error('These discount codes have not been updated:', errorsIds);
    } else {
      console.error('DONE WITHOUT ERRORS');
    }
  }
};

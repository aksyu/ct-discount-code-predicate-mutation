import { getCartDiscounts } from './getCartDiscounts';
import { updateCartDiscount } from './updateCartDiscount';

getCartDiscounts()
  .then((giftCards) => {
    const numericGiftCards = giftCards.filter(
      (el) => el.value.type !== 'giftLineItem' && el.target.type !== 'shipping'
    );

    // console.log(giftCards.length, numericGiftCards.length);
    // console.log(
    //   numericGiftCards.filter((el) => el.target.type !== 'lineItems').length
    // );

    const predicate =
      'product.key not in ("gift-card","gift-card-new")  and price.discount.id is not defined';

    updateCartDiscount(numericGiftCards, predicate);
  })
  .catch((err) => {
    console.error(err);
  });

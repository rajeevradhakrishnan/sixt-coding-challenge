import { OFFER_FALLBACK_IMAGE } from "../utils/constants";

export interface IOffer {
  id: string;
  name: string;
  currency: string;
  price: string | number;
  imageUrl: string;
}

export interface IOfferRawData {
  prices: { totalPrice: { amount: { currency: string; display: string } } };
  splashImages: { url: string }[] | undefined;
  id: string;
  description: string;
}

export const offersModel = (offer: IOfferRawData) => {
  const { currency, display } = offer.prices.totalPrice.amount;
  const imageUrl =
    offer.splashImages !== undefined
      ? offer.splashImages[0].url
      : OFFER_FALLBACK_IMAGE;

  return {
    id: offer.id,
    name: offer.description,
    currency,
    price: display,
    imageUrl,
  } as IOffer;
};

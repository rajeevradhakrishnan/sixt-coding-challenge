import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SixtOfferCard from "../components/sixt-offer-card/SixtOfferCard";
import { getAvailableOffers } from "../redux/offers/offerActions";
import SixtOfferCardSkeleton from "../components/sixt-offer-card/SixtOfferCardSkeleton";
import { IOffer } from "../models/OffersModel";

const Offers = () => {
  const { offers } = useSelector((state: any) => state.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableOffers());
  }, [dispatch]);

  if (offers.length === 0) {
    return <SixtOfferCardSkeleton />;
  }

  return (
    <>
      {offers.map((offer: JSX.IntrinsicAttributes & IOffer) => {
        return <SixtOfferCard key={offer.id} {...offer} />;
      })}
    </>
  );
};

export default Offers;

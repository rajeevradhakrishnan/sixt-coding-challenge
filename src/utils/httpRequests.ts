import axios from "axios";
import { offersModel } from "../models/OffersModel";
import { apis } from "./apis";

export const getOffers = async () => {
  try {
    const { data } = await axios.get(apis.GET_OFFERS.url);
    const { offers } = data.data;
    return offers.map((offer: any) => {
      return offersModel(offer);
    });
  } catch (error) {
    throw error;
  }
};

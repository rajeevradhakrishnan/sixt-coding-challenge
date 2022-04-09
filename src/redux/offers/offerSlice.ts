import { createSlice } from "@reduxjs/toolkit";
import { IOffer } from "../../models/OffersModel";
import { getAvailableOffers } from "./offerActions";

export interface OfferState {
  offers: IOffer[];
}

const initialState: OfferState = {
  offers: [],
};

export const offerSliceName = "offers";

export const offerSlice = createSlice({
  name: offerSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
  },
});

export default offerSlice.reducer;

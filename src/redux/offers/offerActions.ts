import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOffers } from "../../utils/httpRequests";
import { offerSliceName } from "./offerSlice";

export const getAvailableOffers = createAsyncThunk(offerSliceName, async () => {
  return await getOffers();
});

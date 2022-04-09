import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOffers } from "../../utils/httpRequests";
import { offerSliceName } from "./offerSlice";

export const getAvailableOffers = createAsyncThunk(offerSliceName, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await getOffers();
});

import { render } from "@testing-library/react";
import reducer, { offerSlice } from "../redux/offers/offerSlice";

test("should return the initial state of offers", () => {
  return expect(
    reducer(undefined, {
      type: undefined,
    })
  ).toEqual({ offers: [] });
});

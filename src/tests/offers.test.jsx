import { fireEvent, render, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import SixtOfferCard from "../components/sixt-offer-card/SixtOfferCard";
import { getOffers } from "../utils/httpRequests";
import offerReducer from "../redux/offers/offerSlice";
import Offers from "../pages/offers";
import { Provider } from "react-redux";
import { OFFER_FALLBACK_IMAGE } from "../utils/constants";

describe("Test Offer page", () => {
  test("Render offer component", () => {
    const id = "1";
    const name = "Audi A4 Avant oder ähnlich";
    const currency = "EUR";
    const price = "258,00";
    const imageUrl =
      "https://cdn.sixt.io/fleet/images/1600x640/bmw-3er-kombi-grau-2019.jpg";

    const { getByText, getByAltText } = render(
      <SixtOfferCard
        id={id}
        name={name}
        currency={currency}
        price={price}
        imageUrl={imageUrl}
      />
    );

    const image = getByAltText(name);

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(currency + " " + price)).toBeInTheDocument();
    expect(getByAltText(name)).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageUrl);
  });

  test("Render offer component with a fallback image", async () => {
    const id = "1";
    const name = "Audi A4 Avant oder ähnlich";
    const currency = "EUR";
    const price = "258,00";
    const invalidImageUrl = "https://cdn.sixt.io/fleet/invalid.jpg";

    const { getByAltText } = render(
      <SixtOfferCard
        id={id}
        name={name}
        currency={currency}
        price={price}
        imageUrl={invalidImageUrl}
      />
    );

    const image = getByAltText(name);

    // Rendering invalid image which throws an error and should fallback to a default image
    fireEvent.error(image);

    const fallbackImage = OFFER_FALLBACK_IMAGE;

    expect(image).toHaveAttribute("src", fallbackImage);
  });

  test("Fetch offers from API", async () => {
    const offers = await getOffers();
    const [offer] = offers;

    expect(offer.id).toBeDefined();
    expect(offer.name).toBeDefined();
    expect(offer.currency).toBeDefined();
    expect(offer.price).toBeDefined();
    expect(offer.imageUrl).toBeDefined();
  });

  test("Initial redux state of offers", () => {
    return expect(
      offerReducer(undefined, {
        type: undefined,
      })
    ).toEqual({ offers: [] });
  });

  test("Render Offers page with a list of offers by invoking API and display name, image and price", async () => {
    // Initializing Redux store
    const store = configureStore({ reducer: { offers: offerReducer } });

    // Rendering Offers Page
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Offers />
      </Provider>
    );

    // Invoking offers API & picking an object from the response
    const offers = await getOffers();
    const [offer] = offers;
    const { name, currency, price, imageUrl } = offer;

    // Waiting for the offers page to be rendered
    await waitFor(
      async () => {
        // Delaying for the images to be loaded
        const sevenSeconds = 7000;
        await new Promise((resolve) => setTimeout(resolve, sevenSeconds));
        // The rendered component should have the above offer data
        const image = getByAltText(name);

        expect(getByText(name)).toBeInTheDocument();
        expect(getByText(currency + " " + price)).toBeInTheDocument();
        expect(getByAltText(name)).toBeInTheDocument();
        expect(image).toHaveAttribute("src", imageUrl);
      },
      { timeout: 100000 }
    );
  });
});

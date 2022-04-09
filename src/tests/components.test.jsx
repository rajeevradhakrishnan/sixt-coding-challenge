import { render } from "@testing-library/react";
import SixtOfferCard from "../components/sixt-offer-card/SixtOfferCard";

test("renders offer component", () => {
  const id = "1";
  const name = "Audi A4 Avant oder ähnlich";
  const currency = "EUR";
  const price = "258,00";
  const carImage =
    "https://cdn.sixt.io/fleet/images/1600x640/bmw-3er-kombi-grau-2019.jpg";

  const { getByText, getByAltText } = render(
    <SixtOfferCard
      id={id}
      name={name}
      currency={currency}
      price={price}
      imageUrl={carImage}
    />
  );

  const image = getByAltText(name);

  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(currency + " " + price)).toBeInTheDocument();
  expect(getByAltText(name)).toBeInTheDocument();
  expect(image).toHaveAttribute("src", carImage);
});

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CardMedia,
} from "@mui/material";
import { IOffer } from "../../models/OffersModel";
import { OFFER_FALLBACK_IMAGE } from "../../utils/constants";
import SixtOfferCardStyle from "./style";

const SixtOfferCard = ({ imageUrl, name, price, currency }: IOffer) => {
  const handleImageError = (e: any) => {
    e.target.src = OFFER_FALLBACK_IMAGE;
  };

  return (
    <Grid item>
      <Card variant="outlined" sx={SixtOfferCardStyle.card}>
        <CardMedia
          height={180}
          onError={handleImageError}
          image={imageUrl}
          alt={name}
          component="img"
        />
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width={120}>
                <Typography variant="body2" fontWeight="bold">
                  {name}
                </Typography>
              </Box>
              <Typography variant="body1">
                {currency} {price}
              </Typography>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SixtOfferCard;

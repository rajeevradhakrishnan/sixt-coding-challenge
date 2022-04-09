import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SixtOfferCardSkeleton = () => {
  return (
    <>
      {Array.from(Array(10)).map((_, index) => {
        return (
          <Grid key={index} item>
            <Skeleton variant="rectangular" width={300} height={300} />
            <Box display="flex" justifyContent="space-between">
              <Box width="100%">
                <Skeleton width="60%" />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};

export default SixtOfferCardSkeleton;

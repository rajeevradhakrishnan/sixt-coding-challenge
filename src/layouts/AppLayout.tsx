import { Box, Grid } from "@mui/material";
import AppMenuBar from "../components/app-menu-bar";

const AppLayout = ({ children }: any) => {
  return (
    <>
      <AppMenuBar />
      <Box marginTop={12}>
        <Grid
          container
          justifyContent="center"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {children}
        </Grid>
      </Box>
    </>
  );
};

export default AppLayout;

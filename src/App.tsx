import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDesignTokens } from "./theme/theme";

import AppLayout from "./layouts/AppLayout";
import Offers from "./pages/offers";
import { useSelector } from "react-redux";

const App = () => {
  const { mode } = useSelector((state: any) => state.theme);

  const theme = useMemo(() => getDesignTokens(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <Offers />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, ThemeMode } from "../../redux/theme/themeSlice";

const labels = {
  dark: "Switch to dark mode",
  light: "Switch to light mode",
};

const AppMenuBar = () => {
  const { mode } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  const onSwitchChange = (event: any) => {
    dispatch(setTheme(event.target.checked ? ThemeMode.dark : ThemeMode.light));
  };

  return (
    <AppBar>
      <Toolbar>
        <FormControlLabel
          control={<Switch color="secondary" onClick={onSwitchChange} />}
          label={mode === ThemeMode.light ? labels.dark : labels.light}
        />
      </Toolbar>
    </AppBar>
  );
};

export default AppMenuBar;

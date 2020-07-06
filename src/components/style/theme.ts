import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: orange[500],
    },
  },
});

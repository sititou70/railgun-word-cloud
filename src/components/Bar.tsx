import React, { FC } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Bar: FC<{}> = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h5">とある科学の超電磁砲 Word Cloud</Typography>
    </Toolbar>
  </AppBar>
);

export default Bar;

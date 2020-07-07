import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Bar from "./Bar";
import EpisodeSlider from "./EpisodeSlider";
import Cloud from "./Cloud";

import { theme } from "./style/theme";
import { EpisodeRange } from "../types";
import { episode_num } from "./utils";

const App: FC = () => {
  const [episode_range, setEpisodeRange] = useState<EpisodeRange>({
    from: 0,
    to: episode_num - 1,
  });

  return (
    <>
      <Bar />
      <Cloud episode_range={episode_range} />
      <EpisodeSlider
        range={episode_range}
        max_ep={episode_num - 1}
        setEpisodeRange={setEpisodeRange}
      />
    </>
  );
};

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

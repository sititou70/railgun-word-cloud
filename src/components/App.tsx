import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Bar from "./Bar";
import EpisodeSlider from "./EpisodeSlider";

import { theme } from "./style/theme";
import { EpisodeRange, Stories } from "../types";

import stories_json from "../analyser/stories.json";
const stories: Stories = stories_json;
const episode_num = stories.reduce((s, x) => [...s, ...x]).length;

const App: FC = () => {
  const [episode_range, setEpisodeRange] = useState<EpisodeRange>({
    from: 0,
    to: episode_num - 1,
  });

  return (
    <>
      <Bar />
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
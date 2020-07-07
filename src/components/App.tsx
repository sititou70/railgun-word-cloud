import React, { FC, useState, useCallback } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Bar from "./Bar";
import EpisodeSlider from "./EpisodeSlider";
import Cloud from "./Cloud";
import SearchStoriesModal from "./SearchStoriesModal";

import { theme } from "./style/theme";
import { EpisodeRange } from "../types";
import { episode_num } from "./utils";

const App: FC = () => {
  const [episode_range, setEpisodeRange] = useState<EpisodeRange>({
    from: 0,
    to: episode_num - 1,
  });
  const [selected_word, setSelectedWord] = useState<string | null>(null);

  return (
    <>
      <Bar />
      <Cloud
        episode_range={episode_range}
        onWordClick={useCallback((word) => setSelectedWord(word), [])}
      />
      <EpisodeSlider
        range={episode_range}
        max_ep={episode_num - 1}
        setEpisodeRange={setEpisodeRange}
      />
      <SearchStoriesModal
        query={selected_word ? selected_word : "\0"}
        episode_range={episode_range}
        open={selected_word !== null}
        onClose={useCallback(() => setSelectedWord(null), [])}
      />
    </>
  );
};

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

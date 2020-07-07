import React, { FC } from "react";
import ReactWordcloud from "react-wordcloud";
import mix from "mix-color";
import styled from "@emotion/styled";
import { theme } from "./style/theme";

import { EpisodeRange, WordInfo } from "../types";
import { margeWords, flatten_stories } from "./utils";

const color_scale = [...Array(10).keys()].map((x) =>
  mix(theme.palette.secondary.main, theme.palette.primary.main, x / 10)
);

const Cloud: FC<{ episode_range: EpisodeRange }> = ({ episode_range }) => {
  const words: WordInfo[] = flatten_stories
    .slice(episode_range.from, episode_range.to + 1)
    .map((x) => x.words)
    .reduce(margeWords);

  return (
    <CloudRoot>
      <ReactWordcloud
        words={words.map((x) => ({ text: x.word, value: x.num }))}
        options={{
          fontSizes: [18, 72],
          colors: color_scale,
          rotations: 0,
          fontFamily: "serif",
          fontWeight: "bold",
        }}
      />
    </CloudRoot>
  );
};
const CloudRoot = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
`;

export default Cloud;

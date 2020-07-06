import React, { FC, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";
import mix from "mix-color";

import { theme } from "./style/theme";
import { EpisodeRange, Stories, WordInfo } from "../types";
import styled from "@emotion/styled";

import stories_json from "../analyser/stories.json";
const stories: Stories = stories_json;
const flatten_stories = stories.reduce((s, x) => [...s, ...x]);

const margeWords = (x: WordInfo[], y: WordInfo[]): WordInfo[] => {
  const word_count_map: Map<string, number> = new Map();
  const countWords = (words: WordInfo[]): void =>
    words.forEach((x) => {
      const count = word_count_map.get(x.word);
      word_count_map.set(x.word, (count ? count : 0) + x.num);
    });

  countWords(x);
  countWords(y);

  return Array.from(word_count_map.entries()).map((x) => ({
    word: x[0],
    num: x[1],
  }));
};

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

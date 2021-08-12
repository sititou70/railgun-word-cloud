import React, { FC, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";
import mix from "mix-color";
import styled from "@emotion/styled";
import { theme } from "./style/theme";

import { EpisodeRange } from "../types";
import { margeWords, getRangeFilterdFlattenStories } from "./utils";

const color_scale = [...Array(10).keys()].map((x) =>
  mix(theme.palette.secondary.main, theme.palette.primary.main, x / 10)
);

const Cloud: FC<{
  episode_range: EpisodeRange;
  onWordClick?: (word: string) => void;
}> = ({ episode_range, onWordClick }) => {
  const words: { text: string; value: number }[] = useMemo(
    () =>
      getRangeFilterdFlattenStories(episode_range)
        .map((x) => x.words)
        .reduce(margeWords)
        .map((x) => ({ text: x.word, value: x.num })),
    [episode_range]
  );

  const react_wordcloud = useMemo(
    () => (
      <ReactWordcloud
        words={words}
        maxWords={150}
        callbacks={{
          onWordClick: (word) => (onWordClick ? onWordClick(word.text) : null),
        }}
        options={{
          fontSizes: [18, 72],
          colors: color_scale,
          rotations: 0,
          fontFamily: "serif",
          fontWeight: "bold",
        }}
      />
    ),
    [words, onWordClick]
  );

  return <CloudRoot>{react_wordcloud}</CloudRoot>;
};
const CloudRoot = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
`;

export default Cloud;

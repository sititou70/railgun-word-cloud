import React, { FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import { EpisodeRange } from "../types";
import { getEpisodeString, getRangeFilterdFlattenStories } from "./utils";

import { theme } from "./style/theme";
import styled from "@emotion/styled";

const HighlightText: FC<{
  query: string;
  text: string;
}> = ({ query, text }) => (
  <HighlightTextRoot
    dangerouslySetInnerHTML={{
      __html: text.replace(new RegExp(`${query}`, "g"), `<em>${query}</em>`),
    }}
  />
);
const HighlightTextRoot = styled.section`
  em {
    color: ${theme.palette.primary.main};
    font-style: normal;
    font-weight: bold;
  }
`;

const SearchStories: FC<{
  query: string;
  episode_range: EpisodeRange;
}> = ({ query, episode_range }) => {
  return (
    <SearchStoriesRoot>
      {getRangeFilterdFlattenStories(episode_range)
        .map((x, i) => ({ index: i, story: x }))
        .filter((x) => x.story.text.indexOf(query) !== -1)
        .map((x) => (
          <article>
            <Typography variant="h6">
              {getEpisodeString(episode_range.from + x.index)}
            </Typography>
            <HighlightText query={query} text={x.story.text} />
          </article>
        ))}
    </SearchStoriesRoot>
  );
};
const SearchStoriesRoot = styled.div`
  padding: 20px;

  article:not(:first-of-type) h6 {
    margin-top: 20px;
  }
`;

const SearchStoriesModal: FC<{
  query: string;
  episode_range: EpisodeRange;
  open: boolean;
  onClose?: () => void;
}> = ({ query, episode_range, open, onClose }) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <SearchStories query={query} episode_range={episode_range} />
    </Dialog>
  );
};

export default SearchStoriesModal;

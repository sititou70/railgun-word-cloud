import { Stories, WordInfo, EpisodeRange, Story } from "../types";
import stories_json from "../analyser/stories.json";

export const stories: Stories = stories_json;
export const flatten_stories = stories.reduce((s, x) => [...s, ...x]);
export const episode_num = flatten_stories.length;

export const margeWords = (x: WordInfo[], y: WordInfo[]): WordInfo[] => {
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

export const getEpisodeString = (ep: number): string => {
  let rest_ep = ep;
  let current_season = 0;
  while (rest_ep >= stories[current_season].length) {
    rest_ep -= stories[current_season].length;
    current_season++;
  }

  return `season${current_season + 1} ep${rest_ep + 1}`;
};

export const getRangeFilterdFlattenStories = (range: EpisodeRange): Story[] =>
  flatten_stories.slice(range.from, range.to + 1);

export type StoryTexts = string[][];

export type WordInfo = { word: string; num: number };
export type Story = { text: string; words: WordInfo[] };
export type Stories = Story[][];

export type EpisodeRange = {
  from: number;
  to: number;
};

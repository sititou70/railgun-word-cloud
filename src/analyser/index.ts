import fs from "fs";
import path from "path";
import { StoryTexts, Stories, WordInfo } from "../types";
import story_texts_json from "./story_texts.json";
import { getTokenizer } from "kuromojin";

const story_texts: StoryTexts = story_texts_json;

const POS_WHITELIST = ["一般", "名詞", "形容詞", "未定義"];
const POS_DETAIL_BLACKLIST = ["数", "接尾", "非自立", "代名詞", "サ変接続"];
const MIN_WORD_LENGTH = 1;
const OUTPUT = "stories.json";

const main = async () => {
  const tokenizer = await getTokenizer({
    dicPath: path.join(__dirname, "./dict"),
  });

  const stories: Stories = story_texts.map((x) =>
    x.map((x) => {
      //for debugging
      //console.log(
      //  tokenizer
      //    .tokenize(x)
      //    .filter(
      //      (x) =>
      //        POS_WHITELIST.find((y) => x.pos.indexOf(y) !== -1) !== undefined
      //    )
      //    .filter(
      //      (x) =>
      //        POS_DETAIL_BLACKLIST.find(
      //          (y) => x.pos_detail_1.indexOf(y) !== -1
      //        ) === undefined
      //    )
      //);

      const word_texts: string[] = tokenizer
        .tokenize(x)
        .filter((x) => x.surface_form.length > MIN_WORD_LENGTH)
        .filter(
          (x) =>
            POS_WHITELIST.find((y) => x.pos.indexOf(y) !== -1) !== undefined
        )
        .filter(
          (x) =>
            POS_DETAIL_BLACKLIST.find(
              (y) => x.pos_detail_1.indexOf(y) !== -1
            ) === undefined
        )
        .map((x) => x.surface_form);

      const word_count_map: Map<string, number> = new Map();
      word_texts.forEach((x) => {
        const count = word_count_map.get(x);
        word_count_map.set(x, (count ? count : 0) + 1);
      });

      const words: WordInfo[] = Array.from(word_count_map.entries())
        .map((x) => ({ word: x[0], num: x[1] }))
        .sort((x, y) => y.num - x.num);

      return { text: x, words };
    })
  );

  fs.writeFileSync(OUTPUT, JSON.stringify(stories));
};
main();

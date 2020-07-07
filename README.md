# [とある科学の超電磁砲 Word Cloud](https://sititou70.github.io/railgun-word-cloud/)

とある科学の超電磁砲シリーズのキーワードをワードクラウドで可視化します

## 情報元

アニメ公式サイトのストーリーページからキーワードを抽出しています．

- [ストーリー -とある科学の超電磁砲 アニメ公式サイト-](https://toaru-project.com/railgun/story/)
- [STORY -とある科学の超電磁砲 S アニメ公式サイト-](https://toaru-project.com/railgun_s/story/)
- [Introduction - とある科学の超電磁砲 T アニメ公式サイト](https://toaru-project.com/railgun_t/story/)

## ポリシー

本アプリに，とある科学の超電磁砲シリーズのコンテンツイメージを損なわせる意図はありません．

公式サイトから情報を取得する際には，リクエストごとに 7000ms 以上のインターバルを設定しています．これにより，公式サイトをホストするサーバーへの極端な負荷を防止しています．

本アプリに問題がある場合は，本リポジトリの issue へご一報ください．

## License

[MIT License](https://opensource.org/licenses/MIT)

だたし，`src/analyser/dict`は，[kuromoji.js](https://github.com/takuyaa/kuromoji.js)が使用する辞書に[mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd)を追加してビルドした辞書であり，mecab-ipadic-NEologd は Apache License, Version 2.0 を使用しています．

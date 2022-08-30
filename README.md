# ts-unicode-emojis

> Emoji unicode collection type and loader

[![NPM](https://img.shields.io/npm/v/ts-unicode-emojis.svg)](https://www.npmjs.com/package/ts-unicode-emojis) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

### NPM
```bash
npm install --save ts-unicode-emojis
```

### Yarn
```bash
yarn add --save ts-unicode-emojis
```

## Usage

### Generate JSON
```ts
import { readFileSync } from "fs";
import { loadEmojiCategories } from "../src";

const json = readFileSync('./emoji.json').toString()

const emojiCategires = loadEmojiCategories(json, {
    apple: true,
    google: true,
    facebook: false,
    twitter: false
})

console.log(JSON.stringify(emojiCategires))
```
### Parse
```ts
import { readFileSync } from "fs";
import { EmojiCategory } from "ts-unicode-emojis";

// emoji_categories.json: generated json file
const json = readFileSync('./emoji_categories.json').toString()

console.log('json size', json.length)

const emojiCategires: EmojiCategory[] = JSON.parse(json)

console.log('emoji categiry count', emojiCategires.length)

for(const category of emojiCategires) {
    console.log('emoji category', 'name', category.name, 'sub categories', category.subCategories.length)
    for(const subCategory of category.subCategories){
        console.log('sub category', 'name', subCategory.name, 'emoji count', subCategory.emojis.length)
        for(const emoji of subCategory.emojis) {
            console.log('emoji', 'name', emoji.name, `letter[${String.fromCodePoint(...emoji.unicodes)}]`)
        }
    }
}
```

## License

MIT © [2sem](https://github.com/2sem)

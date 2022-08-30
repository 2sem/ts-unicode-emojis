import { readFileSync } from "fs";
import { loadEmojiCategories } from "../src/index";

const json = readFileSync('./emoji.json').toString()

const emojiCategires = loadEmojiCategories(json, {
    google: true,
    apple: true
})

console.log(JSON.stringify(emojiCategires))

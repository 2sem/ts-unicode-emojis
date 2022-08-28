import { readFileSync } from "fs";
import { loadEmojiCategories } from "../src";

const json = readFileSync('./emoji.json').toString()

const emojiCategires = loadEmojiCategories(json, {
    apple: false
})

console.log(JSON.stringify(emojiCategires))

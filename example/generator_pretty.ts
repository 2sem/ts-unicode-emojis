import { readFileSync } from "fs";
import { loadEmojiCategories } from "../src/index";

const json = readFileSync('./emoji.json').toString()

const emojiCategires = loadEmojiCategories(json, {
    platforms: {
        google: true,
        apple: true
    }, 
    // unicodes: true,
    char: true,
})

console.log(JSON.stringify(emojiCategires, null, 2))